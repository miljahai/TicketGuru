package OP1RKS.TicketGuru.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface TicketTypeRepository extends CrudRepository<TicketType, Long> {
	
	List<TicketType> findByName(String name);

	//TicketType findById(int i);

}
