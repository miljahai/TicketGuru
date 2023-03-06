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
	ResponseEntity<Object> editSalesEvent(@RequestBody SalesEvent editSalesEvent, @PathVariable Long id) {
		Optional<SalesEvent> salesEvent = srepo.findById(id);
		if (!salesEvent.isPresent()) {
			return ResponseEntity.badRequest().body("SalesEvent with id " + id + " doesn't exist");
		} 
		SalesEvent existingSalesEvent = salesEvent.get();
		existingSalesEvent.setSale_date(editSalesEvent.getSale_date());
		existingSalesEvent.setPrice(editSalesEvent.getPrice());
		existingSalesEvent.setDeleted(editSalesEvent.isDeleted());
		
		SalesEvent editedSalesEvent = srepo.save(existingSalesEvent);
		return ResponseEntity.ok(editedSalesEvent);
	};
	
	//Find By Id
	@GetMapping("/salesevents/{id}")
	ResponseEntity<Object> getSalesEvent(@PathVariable Long id) {
		if (!srepo.existsById(id)) {
			return ResponseEntity.badRequest().body("SalesEvent with id " + id + " doesn't exist");
		}
		Optional<SalesEvent> foundSalesEvent = srepo.findById(id);
		return ResponseEntity.ok(foundSalesEvent);
	};
	
	//Delete
	ResponseEntity<String> deleteSalesEvent(@PathVariable Long id) {
		if (!srepo.existsById(id)) {
			return ResponseEntity.badRequest().body("SalesEvent with id " + id + " doesn't exist");
		}
		srepo.deleteById(id);
		return ResponseEntity.ok("SalesEvent with id "+ id + " was successfully deleted");
	};	

}

