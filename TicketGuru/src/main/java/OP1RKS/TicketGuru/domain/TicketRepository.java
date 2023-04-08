package OP1RKS.TicketGuru.domain;

import org.springframework.data.repository.CrudRepository;

public interface TicketRepository extends CrudRepository<Ticket, Long> {

	Ticket findByCode(String code);
}
