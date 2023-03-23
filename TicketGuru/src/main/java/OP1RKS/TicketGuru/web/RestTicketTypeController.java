package OP1RKS.TicketGuru.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import OP1RKS.TicketGuru.domain.TicketType;
import OP1RKS.TicketGuru.domain.TicketTypeRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
public class RestTicketTypeController {
	
	@Autowired
	private TicketTypeRepository ttrepo;
	
	// REST TicketType
	// REST List all TicketTypes
	@GetMapping("/tickettypes")
	public Iterable<TicketType> getTicketTypes() {
            return ttrepo.findAll();
	}
	
	// REST Add TicketType
	@PostMapping("/tickettypes")
	@ResponseStatus(HttpStatus.CREATED)
	public TicketType newTicketType (@Valid @RequestBody TicketType newTicketType, BindingResult result) throws MethodArgumentNotValidException {
		if(result.hasErrors()) {
			throw new MethodArgumentNotValidException(null, result);
		} 
		Long eventrecord_id = newTicketType.getEventRecord().getEventrecord_id();
		if(!ttrepo.existsById(eventrecord_id)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event with id " + eventrecord_id + " doesn't exist");
		}
		return ttrepo.save(newTicketType);
	};

	
	// REST Update TickeType
	@PutMapping("/tickettypes/{id}")
	public TicketType editTicketType(@Valid @RequestBody TicketType editTicketType, @PathVariable Long id, BindingResult result) throws MethodArgumentNotValidException {
		Optional<TicketType> ticketType = ttrepo.findById(id);
		if(result.hasErrors()) {
			throw new MethodArgumentNotValidException(null, result);
		} 
		Long eventrecord_id = editTicketType.getEventRecord().getEventrecord_id();		
		if (!ticketType.isPresent()) {
			throw new EntityNotFoundException("TicketType not found with id: " + id);
		} else if (!ttrepo.existsById(eventrecord_id)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event with id " + eventrecord_id + " doesn't exist");
		}
		TicketType existingTicketType = ticketType.get();
		existingTicketType.setName(editTicketType.getName());
		existingTicketType.setPrice(editTicketType.getPrice());
		existingTicketType.setDeleted(editTicketType.isDeleted());

		return ttrepo.save(existingTicketType);
	};
	
	// REST Find TicketType by id
	@GetMapping("/tickettypes/{id}")
	public TicketType getTicketType(@PathVariable Long id) {
		Optional<TicketType> ticketType = ttrepo.findById(id);
		if (ticketType.isPresent()) {
			return ticketType.get();
		} else {
			throw new EntityNotFoundException("TicketType not found with id " + id);
		}
	};
	
	// REST Delete TicketType
	@DeleteMapping("tickettypes/{id}")
	public void deleteTicketType(@PathVariable Long id) {
		if (!ttrepo.existsById(id)) {
			throw new EntityNotFoundException("TicketType not found with id " + id);
		}
		ttrepo.deleteById(id);
	};
};

