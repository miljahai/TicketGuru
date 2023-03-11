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

import OP1RKS.TicketGuru.domain.EventRecord;
import OP1RKS.TicketGuru.domain.EventRecordRepository;

@RestController
public class RestEventRecordController {
	
	@Autowired
	private EventRecordRepository erepo;
	
	// REST EventRecord
	// REST List all EventRecords
	@GetMapping("/events")
	ResponseEntity<Object> getEventRecords() {
		try {
			return new ResponseEntity<>(erepo.findAll(), HttpStatus.OK);
		}
		catch (Exception e) {
			return new ResponseEntity<>(erepo.findAll(), HttpStatus.BAD_REQUEST);
		}
	};
	
	// REST Add
	@PostMapping("/events")
	ResponseEntity<EventRecord> newEventRecord (@RequestBody EventRecord newEventRecord) {
		try {
		erepo.save(newEventRecord);
		return new ResponseEntity<>(newEventRecord, HttpStatus.CREATED);
		}
		catch (Exception e) {
			return new ResponseEntity<>(newEventRecord, HttpStatus.BAD_REQUEST);
		}
	};
	
	// REST Update
	@PutMapping("/events/{id}")
    ResponseEntity<String> editEventRecord(@RequestBody EventRecord editEventRecord, @PathVariable Long id) {
		Optional<EventRecord> eventRecord = erepo.findById(id);
		if (eventRecord.isPresent()) {
			EventRecord existingEventRecord = eventRecord.get();
		        
		    existingEventRecord.setEventrecord_name(editEventRecord.getEventrecord_name());
		    existingEventRecord.setVenue(editEventRecord.getVenue());
		    existingEventRecord.setCity(editEventRecord.getCity());
		    existingEventRecord.setTicketsmax(editEventRecord.getTicketsmax());
		    existingEventRecord.setEvent_starttime(editEventRecord.getEvent_starttime());
		    existingEventRecord.setEvent_endtime(editEventRecord.getEvent_endtime());
		    existingEventRecord.setDeleted(editEventRecord.isDeleted());
		        
		    erepo.save(existingEventRecord);   
		    return new ResponseEntity<>("Event " + existingEventRecord.getEventrecord_id() + " " + existingEventRecord.getEventrecord_name() + " updated", HttpStatus.OK);
		} else {
		    return new ResponseEntity<>("Event with id " + id + " doesn't exist", HttpStatus.BAD_REQUEST);
		}
	};
	
	// REST Find by id
	@GetMapping("/events/{id}")
	ResponseEntity<Object> getEventRecord(@PathVariable Long id) {
		if (!erepo.existsById(id)) {
			return ResponseEntity.badRequest().body("Event with id " + id + " doesn't exist");
		}
		Optional<EventRecord> foundEvent = erepo.findById(id);
		return ResponseEntity.ok(foundEvent);
	};
	
	// REST Delete
	// TBA: tarkista liittyykö poistettavaan Eventtiin TicketTypejä ???
	@DeleteMapping("/events/{id}")
	ResponseEntity<String> deleteEventRecord(@PathVariable Long id) {
		if (!erepo.existsById(id)) {
			return ResponseEntity.badRequest().body("Event with id " + id + " doesn't exist");
		}
		erepo.deleteById(id);
		return ResponseEntity.ok("Event with id "+ id + " was successfully deleted");
	}
	
}