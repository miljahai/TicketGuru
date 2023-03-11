package OP1RKS.TicketGuru.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import OP1RKS.TicketGuru.domain.SalesEventRepository;
import OP1RKS.TicketGuru.domain.Ticket;
import OP1RKS.TicketGuru.domain.TicketRepository;
import OP1RKS.TicketGuru.domain.TicketTypeRepository;
import jakarta.validation.Valid;


@RestController
public class RestTicketController {

	@Autowired
	private TicketRepository trepo;
	
	@Autowired
	private TicketTypeRepository ttrepo;
	
	@Autowired
	private SalesEventRepository srepo;
	
	// REST Ticket
	// REST List all Tickets
	@GetMapping("/tickets")
	public Iterable<Ticket> getTickets() {
		return trepo.findAll();
	};
	
	// REST Add Ticket
	@PostMapping("/tickets")
	ResponseEntity<Object> newTicket (@Valid @RequestBody Ticket newTicket) {
		Long ticket_type_id = newTicket.getTicketType().getTicket_type_id();
		Long salesevent_id = newTicket.getSalesEvent().getSalesevent_id();
				
		if(!ttrepo.existsById(ticket_type_id)) {
			return new ResponseEntity<>("TicketType with id " + ticket_type_id + " doesn't exist", HttpStatus.BAD_REQUEST);
		} else if (!srepo.existsById(salesevent_id)) {
			return new ResponseEntity<>("SalesEvent with id " + salesevent_id + " doesn't exist", HttpStatus.BAD_REQUEST);
		}
		Ticket savedTicket = trepo.save(newTicket);
		return new ResponseEntity<>(savedTicket, HttpStatus.CREATED);
	};
	
	// REST Update Ticket
	@PutMapping("/tickets/{id}")
	ResponseEntity<Object> editTicket(@Valid @RequestBody Ticket editTicket, @PathVariable Long id) {
		Optional<Ticket> ticket = trepo.findById(id);
		Long ticket_type_id = editTicket.getTicketType().getTicket_type_id();
		Long salesevent_id = editTicket.getSalesEvent().getSalesevent_id();
				
		if (!ticket.isPresent()) {
			return new ResponseEntity<>("Ticket with id " + id + " doesn't exist", HttpStatus.BAD_REQUEST);
		} else if (!ttrepo.existsById(ticket_type_id)) {
			return new ResponseEntity<>("TicketType with id " + ticket_type_id + " doesn't exist", HttpStatus.BAD_REQUEST);
		} else if (!srepo.existsById(salesevent_id)) {
			return new ResponseEntity<>("SalesEvent with id " + salesevent_id + " doesn't exist", HttpStatus.BAD_REQUEST);
		} 
		
		Ticket existingTicket = ticket.get();
		existingTicket.setTicket_code(editTicket.getTicket_code());
		existingTicket.setPrice(editTicket.getPrice());
		existingTicket.setDeleted(editTicket.isDeleted());
		existingTicket.setSalesEvent(editTicket.getSalesEvent());
		existingTicket.setTicketType(editTicket.getTicketType());
		
		Ticket editedTicket = trepo.save(existingTicket);
		return new ResponseEntity<>(editedTicket, HttpStatus.OK);
	};
	
	// REST Find Ticket by id
	@GetMapping("/tickets/{id}")
	ResponseEntity<Object> getTicket(@PathVariable Long id) {
		
		if (!trepo.existsById(id)) {
			return new ResponseEntity<>("Ticket with id " + id + " doesn't exist", HttpStatus.NOT_FOUND);
		}
		Optional<Ticket> foundTicket = trepo.findById(id);
		return new ResponseEntity<>(foundTicket, HttpStatus.OK);
	};
	
	// REST Delete Ticket
	@DeleteMapping("tickets/{id}")
	ResponseEntity<String> deleteTicket(@PathVariable Long id) {
		
		if (!trepo.existsById(id)) {
			return new ResponseEntity<>("Ticket with id " + id + " doesn't exist", HttpStatus.NOT_FOUND);
		}
		trepo.deleteById(id);
		return new ResponseEntity<>("Ticket with id " + id + " was successfully deleted", HttpStatus.OK);
	};
};