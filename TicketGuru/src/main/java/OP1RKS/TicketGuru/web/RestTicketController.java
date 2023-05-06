package OP1RKS.TicketGuru.web;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

import OP1RKS.TicketGuru.domain.SalesEventRepository;
import OP1RKS.TicketGuru.domain.Ticket;
import OP1RKS.TicketGuru.domain.TicketRepository;
import OP1RKS.TicketGuru.domain.TicketTypeRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@CrossOrigin(origins = {"http://localhost:8080","http://localhost:3000","https://cen-cenru4.azurewebsites.net", "https://miljahai.github.io"}, maxAge = 3600)
@RestController
public class RestTicketController {

	@Autowired
	private TicketRepository trepo;
	
	@Autowired
	private TicketTypeRepository ttrepo;
	
	@Autowired
	private SalesEventRepository srepo;
	
	// REST Ticket
	// REST List all Tickets or find by Code
	@GetMapping("/tickets")
	 public Iterable<Ticket> getTickets(@RequestParam(required = false) String code) { 
		if (code != null) {
			System.out.println(code);
	        Ticket ticket = trepo.findByCode(code);
	        if (ticket != null) {
	            return Collections.singletonList(ticket);
	        } else {
	            throw new EntityNotFoundException("Ticket not found with code " + code);
	        }
	    } else {
	        return trepo.findAll();
	    }
	};
	
	// REST Add Ticket
	@PostMapping("/tickets")
	@ResponseStatus(HttpStatus.CREATED)
	public Ticket newTicket (@Valid @RequestBody Ticket newTicket, BindingResult result) throws MethodArgumentNotValidException {
		if(result.hasErrors()) {
			throw new MethodArgumentNotValidException(null, result);
		} 
		Long ticket_type_id = newTicket.getTicketType().getTicket_type_id();
		Long salesevent_id = newTicket.getSalesEvent().getSalesevent_id();
		if(!ttrepo.existsById(ticket_type_id)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "TicketType with id " + ticket_type_id + " doesn't exist");
		} else if (!srepo.existsById(salesevent_id)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "SalesEvent with id " + salesevent_id + " doesn't exist");
		} 
		return trepo.save(newTicket);
	};
	
	// REST Update Ticket
	@PutMapping("/tickets/{id}")
	public Ticket editTicket(@Valid @RequestBody Ticket editTicket, @PathVariable Long id, BindingResult result) throws MethodArgumentNotValidException {
		Optional<Ticket> ticket = trepo.findById(id);
		if(result.hasErrors()) {
			throw new MethodArgumentNotValidException(null, result);
		} 
		Long ticket_type_id = editTicket.getTicketType().getTicket_type_id();
		Long salesevent_id = editTicket.getSalesEvent().getSalesevent_id();				
		if (!ticket.isPresent()) {
			throw new EntityNotFoundException("Ticket not found with id: " + id);
		} else if (!ttrepo.existsById(ticket_type_id)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "TicketType with id " + ticket_type_id + " doesn't exist");
		} else if (!srepo.existsById(salesevent_id)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "SalesEvent with id " + salesevent_id + " doesn't exist");
		} 
		
		Ticket existingTicket = ticket.get();
		//existingTicket.setCode(editTicket.getCode());
		existingTicket.setPrice(editTicket.getPrice());
		existingTicket.setDeleted(editTicket.isDeleted());
		existingTicket.setSalesEvent(editTicket.getSalesEvent());
		existingTicket.setTicketType(editTicket.getTicketType());
		
		return trepo.save(existingTicket);
	};
	
	// REST Find Ticket by id
	@GetMapping("/tickets/{id}")
	public Ticket getTicket(@PathVariable Long id) {
		Optional<Ticket> ticket = trepo.findById(id);
		if (ticket.isPresent()) {
			return ticket.get();
		} else {
			throw new EntityNotFoundException("Ticket not found with id " + id);
		}
	};
	
	// REST Delete Ticket
	@DeleteMapping("tickets/{id}")
	public void deleteTicket(@PathVariable Long id) {
		if (!trepo.existsById(id)) {
			throw new EntityNotFoundException("Ticket not found with id " + id);
		}
		trepo.deleteById(id);
	};

	
	// REST Set Ticket used
	@PatchMapping("/tickets/{id}")
	public Ticket useTicket(@Valid @RequestBody Ticket editTicket, @PathVariable Long id, BindingResult result) throws MethodArgumentNotValidException {
		Optional<Ticket> ticket = trepo.findById(id);
		if(result.hasErrors()) {
			throw new MethodArgumentNotValidException(null, result);
		} 
		if (!ticket.isPresent()) {
			throw new EntityNotFoundException("Ticket not found with id: " + id);
		} 
		
		Ticket existingTicket = ticket.get();
		existingTicket.setUsed(LocalDateTime.now());
		return trepo.save(existingTicket);
	};
	
	// Generate QR-code
	@GetMapping("/qrcode/{code}")
	  public ResponseEntity<byte[]> generateQRCode(@PathVariable String code) throws Exception {
	    // Create a BitMatrix representing the QR code
	    BitMatrix matrix = new MultiFormatWriter().encode(code, BarcodeFormat.QR_CODE, 200, 200);
	    
	    // Convert the BitMatrix to a byte array
	    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
	    MatrixToImageWriter.writeToStream(matrix, "png", outputStream);
	    byte[] qrCodeBytes = outputStream.toByteArray();
	    
	    // Set the Content-Type header and return the byte array as a ResponseEntity
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.IMAGE_PNG);
	    return new ResponseEntity<byte[]>(qrCodeBytes, headers, HttpStatus.OK);
	  }

};