package OP1RKS.TicketGuru.domain;

//import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface TicketRepository extends CrudRepository<Ticket, Long> {

	//Optional<Ticket> findById(Long id);
}
