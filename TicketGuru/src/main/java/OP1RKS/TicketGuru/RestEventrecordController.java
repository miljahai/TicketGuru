package OP1RKS.TicketGuru;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import OP1RKS.TicketGuru.domain.EventRecordRepository;

@RestController
public class RestEventrecordController {
	
	@Autowired
	private EventRecordRepository erepo;
	
	
}
