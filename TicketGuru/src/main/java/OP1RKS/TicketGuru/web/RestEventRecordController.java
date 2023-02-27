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

import OP1RKS.TicketGuru.domain.EventRecord;
import OP1RKS.TicketGuru.domain.EventRecordRepository;

@RestController
public class RestEventRecordController {
	
	@Autowired
	private EventRecordRepository erepo;
	
	// REST EventRecord
	// REST List all EventRecords
	@GetMapping("/events")
	public Iterable<EventRecord> getEventRecords() {
		return erepo.findAll();
	};
	// REST Add
	@PostMapping("/events")
	EventRecord newEventRecord (@RequestBody EventRecord newEventRecord) {
		return erepo.save(newEventRecord);
	};
	// REST Update
	@PutMapping("/events/{id}")
    EventRecord editEventRecord(@RequestBody EventRecord editEventRecord, @PathVariable Long id) {
		Optional<EventRecord> eventRecord = erepo.findById(id);
		if (eventRecord.isPresent()) {
			EventRecord existingEventRecord = eventRecord.get();
		        
		    existingEventRecord.setEventrecord_name(editEventRecord.getEventrecord_name());
		    existingEventRecord.setEvent_starttime(editEventRecord.getEvent_starttime());
		    existingEventRecord.setEvent_endtime(editEventRecord.getEvent_endtime());
		    existingEventRecord.setDeleted(editEventRecord.isDeleted());
		        
		    erepo.save(existingEventRecord);   
		    return existingEventRecord;
		} else {
		    return null;
		}
	}
	// REST Find by id
	@GetMapping("/events/{id}")
	Optional<EventRecord> getEventRecord(@PathVariable Long id) {
		return erepo.findById(id);
	};
	// REST Delete
	@DeleteMapping("/events/{id}")
	ResponseEntity<String> deleteEventRecord(@PathVariable Long id) {
		erepo.deleteById(id);
		return ResponseEntity.ok("Event with id "+ id + " was successfully deleted");
	}
	
}