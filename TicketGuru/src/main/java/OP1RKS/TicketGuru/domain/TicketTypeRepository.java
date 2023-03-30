package OP1RKS.TicketGuru.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface TicketTypeRepository extends CrudRepository<TicketType, Long> {
	
	// List<TicketType> findByName(String ticket_type_name);

	// TicketType findById(int i);

}
