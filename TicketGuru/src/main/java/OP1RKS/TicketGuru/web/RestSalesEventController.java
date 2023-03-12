package OP1RKS.TicketGuru.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
	ResponseEntity<Object> getEventRecords() {
		try {
			return new ResponseEntity<>(srepo.findAll(), HttpStatus.OK);
		}
		catch (Exception e) {
			return new ResponseEntity<>(srepo.findAll(), HttpStatus.NOT_FOUND);
			}
	};

	//Add
	@PostMapping("salesevents")
	ResponseEntity<SalesEvent> newEventRecord (@RequestBody SalesEvent newSalesEvent) {
		try {
			srepo.save(newSalesEvent);
			return new ResponseEntity<>(newSalesEvent, HttpStatus.CREATED);
		}
		catch (Exception e) {
			return new ResponseEntity<>(newSalesEvent, HttpStatus.BAD_REQUEST);
		}
	};
		
	//Update
	@PutMapping("/salesevents/{id}")
	ResponseEntity<Object> editSalesEvent(@RequestBody SalesEvent editSalesEvent, @PathVariable Long id) {
		Optional<SalesEvent> salesEvent = srepo.findById(id);
		if (!salesEvent.isPresent()) {
			return new ResponseEntity<>("Sales Event with id " + id + " doesn't exist", HttpStatus.NOT_FOUND);
		} 
		SalesEvent existingSalesEvent = salesEvent.get();
		existingSalesEvent.setSale_date(editSalesEvent.getSale_date());
		existingSalesEvent.setPrice(editSalesEvent.getPrice());
		existingSalesEvent.setDeleted(editSalesEvent.isDeleted());
		
		SalesEvent editedSalesEvent = srepo.save(existingSalesEvent);
		return new ResponseEntity<>(editedSalesEvent, HttpStatus.OK);
	};
	
	//Find By Id
	@GetMapping("/salesevents/{id}")
	ResponseEntity<Object> getSalesEvent(@PathVariable Long id) {
		if (!srepo.existsById(id)) {
			return new ResponseEntity<>("Sales Event with id " + id + " doesn't exist", HttpStatus.NOT_FOUND);
		}
		Optional<SalesEvent> foundSalesEvent = srepo.findById(id);
		return new ResponseEntity<>(foundSalesEvent, HttpStatus.OK);
	};
	
	//Delete
	@DeleteMapping("/salesevents/{id}")
	ResponseEntity<String> deleteSalesEvent(@PathVariable Long id) {
		if (!srepo.existsById(id)) {
			return new ResponseEntity<>("Sales Event with id " + id + " doesn't exist", HttpStatus.NOT_FOUND);
		}
		srepo.deleteById(id);
		return new ResponseEntity<>("Sales Event with id " + id + " was successfully deleted", HttpStatus.OK);
	};	

}

