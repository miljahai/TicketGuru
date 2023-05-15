package OP1RKS.TicketGuru.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import OP1RKS.TicketGuru.domain.EventRecord;
import OP1RKS.TicketGuru.domain.EventRecordRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@CrossOrigin(origins = {"http://localhost:8080","http://localhost:3000","https://cen-cenru4.azurewebsites.net", "https://miljahai.github.io"}, maxAge = 3600)
@RestController
public class RestEventRecordController {
	
	@Autowired
	private EventRecordRepository erepo;
	
	// REST EventRecord
	// No userrole requirements, but JWT is required by default
	// REST List all EventRecords
	// Note! In the EventRecord Entity items with value 'deleted' set to true are filtered.
	@GetMapping("/events")
	public Iterable<EventRecord> getEventRecords() {
		return erepo.findAll();
	};
	
	// REST Add
	// Create a new EventRecord
	// User must have userrole ADMIN or EVENTS
	// return the created EventRecord
	@PostMapping("/events")
	@PreAuthorize("hasAnyAuthority('ADMIN', 'EVENTS')")
	@ResponseStatus(HttpStatus.CREATED)
	public EventRecord newEventRecord (@Valid @RequestBody EventRecord newEventRecord, BindingResult result) throws MethodArgumentNotValidException {
		if(result.hasErrors()) {
			throw new MethodArgumentNotValidException(null, result);
		} 
		return erepo.save(newEventRecord);
	};
	
	// REST Update
	// Update a new EventRecord
	// User must have userrole ADMIN or EVENTS
	// return the updated EventRecord
	@PutMapping("/events/{id}")
	@PreAuthorize("hasAnyAuthority('ADMIN', 'EVENTS')")
    public EventRecord editEventRecord(@Valid @RequestBody EventRecord editEventRecord, @PathVariable Long id, BindingResult result) throws MethodArgumentNotValidException {
		Optional<EventRecord> eventRecord = erepo.findById(id);
		if (eventRecord.isPresent()) {
			if(result.hasErrors()) {
				throw new MethodArgumentNotValidException(null, result);
			} 
			EventRecord existingEventRecord = eventRecord.get();
		        
		    existingEventRecord.setEventrecord_name(editEventRecord.getEventrecord_name());
		    existingEventRecord.setVenue(editEventRecord.getVenue());
		    existingEventRecord.setCity(editEventRecord.getCity());
		    existingEventRecord.setTicketsmax(editEventRecord.getTicketsmax());
		    existingEventRecord.setEvent_starttime(editEventRecord.getEvent_starttime());
		    existingEventRecord.setEvent_endtime(editEventRecord.getEvent_endtime());
		    existingEventRecord.setDeleted(editEventRecord.isDeleted());
		        
		    return erepo.save(existingEventRecord);   
		} else {
			throw new EntityNotFoundException("Event not found with id: " + id);
		}
	};
	
	// REST Find by id
	// No userrole requirements, but JWT is required by default
	// return EventRecord by queried id
	// Note! In the EventRecord Entity items with value 'deleted' set to true are filtered.
	@GetMapping("/events/{id}")
	public EventRecord getEventRecord(@PathVariable Long id) {
		Optional<EventRecord> event = erepo.findById(id);
		if (event.isPresent()) {
			return event.get();
		} else {
			throw new EntityNotFoundException("Event not found with id " + id);
		}
	};
	
	// REST Delete
	// User must have userrole ADMIN or EVENTS
	// Delete EventRecord by queried id
	// Note! Deletion is soft. In the Entity value 'deleted' is set to true.
	@DeleteMapping("/events/{id}")
	@PreAuthorize("hasAnyAuthority('ADMIN', 'EVENTS')")
	public void deleteEventRecord(@PathVariable Long id) {
		if (!erepo.existsById(id)) {
			throw new EntityNotFoundException("Event not found with id " + id);
		}
		erepo.deleteById(id);
	};
	
}