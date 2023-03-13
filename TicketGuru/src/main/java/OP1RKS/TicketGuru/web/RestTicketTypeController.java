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
import OP1RKS.TicketGuru.domain.TicketType;
import OP1RKS.TicketGuru.domain.TicketTypeRepository;

@RestController
public class RestTicketTypeController {
	
	@Autowired
	private TicketTypeRepository ttrepo;
	
	// REST TicketType
	// REST List all TicketTypes
	@GetMapping("/tickettypes")
	ResponseEntity<Object> getTicketTypes() {
		try {
			return new ResponseEntity<>(ttrepo.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(ttrepo.findAll(), HttpStatus.NOT_FOUND);
		}
	};
	
	// REST Add TicketType
	@PostMapping("/tickettypes")
	ResponseEntity<TicketType> newTicketType (@RequestBody TicketType newTicketType) {
		try {
			ttrepo.save(newTicketType);
			return new ResponseEntity<>(newTicketType, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(newTicketType, HttpStatus.BAD_REQUEST);
		}
		
	};

	
	// REST Update TickeType
	@PutMapping("/tickettypes/{id}")
	ResponseEntity<Object> editTicketType(@RequestBody TicketType editTicketType, @PathVariable Long id) {
		Optional<TicketType> ticketType = ttrepo.findById(id);
		if (ticketType.isPresent()) {
			TicketType existingTicketType = ticketType.get();
			existingTicketType.setName(editTicketType.getName());
			existingTicketType.setPrice(editTicketType.getPrice());
			existingTicketType.setDeleted(editTicketType.isDeleted());
			
			ttrepo.save(existingTicketType);
			return new ResponseEntity<>("Ticket type " + existingTicketType.getName() + " updated", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Ticket type with" + id + " doesn't exist", HttpStatus.NOT_FOUND);
		}
	};
	
	
	// REST Find TicketType by id
	@GetMapping("/tickettypes/{id}")
	ResponseEntity<Object> getTicketType(@PathVariable Long id) {
		if (!ttrepo.existsById(id)) {
			return new ResponseEntity<>("Ticket type with id " + id + " doesn't exist", HttpStatus.NOT_FOUND);
		}
		Optional<TicketType> foundTicketType = ttrepo.findById(id);
		return new ResponseEntity<>(foundTicketType, HttpStatus.OK);
	};
	
	// REST Delete TicketType
	@DeleteMapping("/tickettypes/{id}")
	ResponseEntity<String> deleteTicketType(@PathVariable Long id) {
		if (!ttrepo.existsById(id)) {
			return new ResponseEntity<>("Ticket type with id " + id + " doesn't exist", HttpStatus.NOT_FOUND);
		}
		ttrepo.deleteById(id);
		return new ResponseEntity<>("Ticket type with id " + id + " was successfully deleted", HttpStatus.OK);
	}
}