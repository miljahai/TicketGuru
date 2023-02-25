package OP1RKS.TicketGuru.domain;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface EventRecordRepository extends CrudRepository<EventRecord, Long> {
	Optional<EventRecord> findById(Long eventrecord_id);
	
}
