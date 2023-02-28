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
	TicketType newTicketType (@RequestBody TicketType newTicketType) {
		return ttrepo.save(newTicketType);
	};
	
	// REST Update TickeType
	@PutMapping("/tickettypes/{id}")
	TicketType editTicketType(@RequestBody TicketType editTicketType, @PathVariable Long id) {
		Optional<TicketType> ticketType = ttrepo.findById(id);
		if (ticketType.isPresent()) {
			TicketType existingTicketType = ticketType.get();
			
			existingTicketType.setName(editTicketType.getName());
			existingTicketType.setPrice(editTicketType.getPrice());
			existingTicketType.setDeleted(editTicketType.isDeleted());
			
			ttrepo.save(existingTicketType);
			return existingTicketType;
		} else {
			return null;
		}
	};
	
	// REST Find TicketType by id
	@GetMapping("/tickettypes/{id}")
	Optional<TicketType> getTicketType(@PathVariable Long id) {
		return ttrepo.findById(id);
	};
	
	// REST Delete TicketType
	@DeleteMapping("tickettypes/{id}")
	ResponseEntity<String> deleteTicketType(@PathVariable Long id) {
		ttrepo.deleteById(id);
		return ResponseEntity.ok("TicketType with id "+ id + " was successfully deleted");
	};
};