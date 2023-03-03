package OP1RKS.TicketGuru.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import OP1RKS.TicketGuru.domain.SalesEvent;
import OP1RKS.TicketGuru.domain.SalesEventRepository;

@RestController
public class RestSalesEventController {
	
	@Autowired
	private SalesEventRepository srepo;
	
	//List all
	@GetMapping("/salesevents")
	public Iterable<SalesEvent> getSalesEvents() {
		return srepo.findAll();
	};

	//Add
	@PostMapping("salesevents")
	SalesEvent newSalesEvent(@RequestBody SalesEvent newSalesEvent) {
		return srepo.save(newSalesEvent);
	};
	
		
	//Update
	@PutMapping("/salesevents/{id}")
	SalesEvent editSalesEvent(@RequestBody SalesEvent editSalesEvent, @PathVariable Long id) {
		Optional<SalesEvent> salesEvent = srepo.findById(id);
		if (salesEvent.isPresent()) {
			SalesEvent existingSalesEvent = salesEvent.get();
			
			existingSalesEvent.setSale_date(editSalesEvent.getSale_date());
			existingSalesEvent.setPrice(editSalesEvent.getPrice());
			existingSalesEvent.setDeleted(editSalesEvent.isDeleted());
			
			srepo.save(existingSalesEvent);
			return existingSalesEvent;
		} else {
			return null;
		}
	};
	
	//Find By Id
	@GetMapping("/salesevent/{id}")
	Optional<SalesEvent> getSalesEvent(@PathVariable Long id) {
		return srepo.findById(id);
	};
	
	//Delete
	ResponseEntity<String> deleteSalesEvent(@PathVariable Long id) {
		srepo.deleteById(id);
		return ResponseEntity.ok("Event with id " + id + " was succesfully deleted");
	};	

}

