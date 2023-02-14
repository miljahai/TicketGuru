package OP1RKS.TicketGuru.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
	@GetMapping("/events/api")
	public Iterable<EventRecord> getEventRecords() {
		return erepo.findAll();
	};
	// REST Add
	@PostMapping("/events")
	EventRecord newEventRecord (@RequestBody EventRecord newEventRecord) {
		return erepo.save(newEventRecord);
	}
	// REST Update
	
	// REST Find by id
	
	// REST Delete
	
	
}