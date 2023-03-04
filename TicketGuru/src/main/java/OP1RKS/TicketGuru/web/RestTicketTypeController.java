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

import OP1RKS.TicketGuru.domain.TicketType;
import OP1RKS.TicketGuru.domain.TicketTypeRepository;

@RestController
public class RestTicketTypeController {
	
	@Autowired
	private TicketTypeRepository ttrepo;
	
	// REST TicketType
	// REST List all TicketTypes
	@GetMapping("/tickettypes")
	public Iterable<TicketType> getTicketTypes() {
		return ttrepo.findAll();
	};
	
	// REST Add TicketType
	@PostMapping("/tickettypes")
	ResponseEntity<Object> newTicketType (@RequestBody TicketType newTicketType) {
		Long eventrecord_id = newTicketType.getEventRecord().getEventrecord_id();
		
		if(!ttrepo.existsById(eventrecord_id)) {
			return ResponseEntity.badRequest().body("Event with id " + eventrecord_id + " doesn't exist");
		}
		TicketType savedTicketType = ttrepo.save(newTicketType);
		return ResponseEntity.ok(savedTicketType);
	};

	
	// REST Update TickeType
	@PutMapping("/tickettypes/{id}")
	ResponseEntity<Object> editTicketType(@RequestBody TicketType editTicketType, @PathVariable Long id) {
		Optional<TicketType> ticketType = ttrepo.findById(id);
		Long eventrecord_id = editTicketType.getEventRecord().getEventrecord_id();
		
		if (!ticketType.isPresent()) {
			return ResponseEntity.badRequest().body("TicketType with id " + id + " doesn't exist");
		} else if (!ttrepo.existsById(eventrecord_id)) {
			return ResponseEntity.badRequest().body("Event with id " + eventrecord_id + " doesn't exist");
		}
		TicketType existingTicketType = ticketType.get();
		existingTicketType.setName(editTicketType.getName());
		existingTicketType.setPrice(editTicketType.getPrice());
		existingTicketType.setDeleted(editTicketType.isDeleted());
		
		TicketType editedTicketType = ttrepo.save(existingTicketType);
		return ResponseEntity.ok(editedTicketType);
	};
	
	// REST Find TicketType by id
	@GetMapping("/tickettypes/{id}")
	ResponseEntity<Object> getTicketType(@PathVariable Long id) {
		if (!ttrepo.existsById(id)) {
			return ResponseEntity.badRequest().body("TicketType with id " + id + " doesn't exist");
		}
		Optional<TicketType> foundTicketType = ttrepo.findById(id);
		return ResponseEntity.ok(foundTicketType);
	};
	
	// REST Delete TicketType
	@DeleteMapping("tickettypes/{id}")
	ResponseEntity<String> deleteTicketType(@PathVariable Long id) {
		if (!ttrepo.existsById(id)) {
			return ResponseEntity.badRequest().body("TicketType with id " + id + " doesn't exist");
		}
		ttrepo.deleteById(id);
		return ResponseEntity.ok("TicketType with id "+ id + " was successfully deleted");
	};
};