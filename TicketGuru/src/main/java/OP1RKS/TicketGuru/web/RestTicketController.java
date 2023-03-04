package OP1RKS.TicketGuru.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import OP1RKS.TicketGuru.domain.Ticket;
import OP1RKS.TicketGuru.domain.TicketRepository;
import OP1RKS.TicketGuru.domain.TicketTypeRepository;


@RestController
public class RestTicketController {
	
	@Autowired
	private TicketRepository trepo;
	
	@Autowired
	private TicketTypeRepository ttrepo;
		

	// REST Ticket
	// REST List all Tickets
	@GetMapping("/tickets")
	public Iterable<Ticket> getTickets() {
		return trepo.findAll();
	};
	
	// REST Add Ticket
	@PostMapping("/tickets")
	ResponseEntity<Object> newTicket (@RequestBody Ticket newTicket) {
		Long ticket_type_id = newTicket.getTicketType().getTicket_type_id();
		
		if(!ttrepo.existsById(ticket_type_id)) {
			return ResponseEntity.badRequest().body("Ticket type with id " + ticket_type_id + " doesn't exist");
		}
		Ticket savedTicket = trepo.save(newTicket);
		return ResponseEntity.ok(savedTicket);
	};
	
	// REST Update Ticket
	@PutMapping("/tickets/{id}")
	ResponseEntity<Object> editTicket(@RequestBody Ticket editTicket, @PathVariable Long id) {
		Optional<Ticket> ticket = trepo.findById(id);
		Long ticket_type_id = editTicket.getTicketType().getTicket_type_id();
		
		if (!ticket.isPresent()) {
			return ResponseEntity.badRequest().body("Ticket with id " + id + " doesn't exist");
		} else if (!ttrepo.existsById(ticket_type_id)) {
			return ResponseEntity.badRequest().body("Ticket type with id " + ticket_type_id + " doesn't exist");
		}
		
		Ticket existingTicket = ticket.get();
		existingTicket.setTicket_code(editTicket.getTicket_code());
		existingTicket.setPrice(editTicket.getPrice());
		existingTicket.setDeleted(editTicket.isDeleted());
		
		Ticket editedTicket = trepo.save(existingTicket);
		return ResponseEntity.ok(editedTicket);
	};
	
	// REST Find Ticket by id
	@GetMapping("/tickets/{id}")
	ResponseEntity<Object> getTicket(@PathVariable Long id) {
		
		if (!trepo.existsById(id)) {
			return ResponseEntity.badRequest().body("Ticket with id " + id + " doesn't exist");
		}
		Optional<Ticket> foundTicket = trepo.findById(id);
		return ResponseEntity.ok(foundTicket);
	};
	
	// REST Delete Ticket
	@DeleteMapping("tickets/{id}")
	ResponseEntity<String> deleteTicket(@PathVariable Long id) {
		
		if (!trepo.existsById(id)) {
			return ResponseEntity.badRequest().body("Ticket with id " + id + " doesn't exist");
		}
		trepo.deleteById(id);
		return ResponseEntity.ok("Ticket with id "+ id + " was successfully deleted");
	};
};