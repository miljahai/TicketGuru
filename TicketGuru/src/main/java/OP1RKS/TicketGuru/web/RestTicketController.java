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


@RestController
public class RestTicketController {
	
	@Autowired
	private TicketRepository trepo;
	

	// REST Ticket
	// REST List all Tickets
	@GetMapping("/tickets")
	public Iterable<Ticket> getTicketTypes() {
		return trepo.findAll();
	};
	
	// REST Add Ticket
	@PostMapping("/tickets")
	Ticket newTicket (@RequestBody Ticket newTicket) {
		return trepo.save(newTicket);
	};
	
	// REST Update Ticket
	@PutMapping("/tickets/{id}")
	Ticket editTicket(@RequestBody Ticket editTicket, @PathVariable Long id) {
		Optional<Ticket> ticket = trepo.findById(id);
		if (ticket.isPresent()) {
			Ticket existingTicket = ticket.get();
			
			existingTicket.setTicket_code(editTicket.getTicket_code());
			existingTicket.setPrice(editTicket.getPrice());
			existingTicket.setDeleted(editTicket.isDeleted());
			
			trepo.save(existingTicket);
			return existingTicket;
		} else {
			return null;
		}
	};
	
	// REST Find Ticket by id
	@GetMapping("/tickets/{id}")
	Optional<Ticket> getTicket(@PathVariable Long id) {
		return trepo.findById(id);
	};
	
	// REST Delete Ticket
	@DeleteMapping("tickets/{id}")
	ResponseEntity<String> deleteTicket(@PathVariable Long id) {
		trepo.deleteById(id);
		return ResponseEntity.ok("Ticket with id "+ id + " was successfully deleted");
	};
};