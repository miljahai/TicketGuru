package OP1RKS.TicketGuru.domain;

import org.springframework.data.repository.CrudRepository;

public interface AppUserRepository extends CrudRepository<AppUser, Long>{
	AppUser findByEmail(String email);
}
