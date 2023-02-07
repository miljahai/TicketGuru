package OP1RKS.TicketGuru.domain;

import org.springframework.data.repository.CrudRepository;

public interface EventRecordRepository extends CrudRepository<EventRecord, Long> {
	
	EventRecord findbyName(String eventrecord_name);
	
}
