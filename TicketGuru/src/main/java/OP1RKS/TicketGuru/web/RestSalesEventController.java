package OP1RKS.TicketGuru.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import OP1RKS.TicketGuru.domain.SalesEvent;
import OP1RKS.TicketGuru.domain.SalesEventRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
public class RestSalesEventController {
	
	@Autowired
	private SalesEventRepository srepo;
	
	//List all
	@GetMapping("/salesevents")
	public Iterable<SalesEvent> getSalesEvents() {
            return srepo.findAll();
	}

	//Add
	@PostMapping("salesevents")
	@ResponseStatus(HttpStatus.CREATED)
	public SalesEvent newSalesEvent(@Valid @RequestBody SalesEvent newSalesEvent, BindingResult result) throws MethodArgumentNotValidException {
		if(result.hasErrors()) {
			throw new MethodArgumentNotValidException(null, result);
		} 
		return srepo.save(newSalesEvent);
	};
		
	//Update
	@PutMapping("/salesevents/{id}")
	public SalesEvent editSalesEvent(@Valid @RequestBody SalesEvent editSalesEvent, @PathVariable Long id, BindingResult result) throws MethodArgumentNotValidException {
		Optional<SalesEvent> salesEvent = srepo.findById(id);		
		if (salesEvent.isPresent()) {
			if(result.hasErrors()) {
				throw new MethodArgumentNotValidException(null, result);
			} 
			SalesEvent existingSalesEvent = salesEvent.get();
			existingSalesEvent.setSale_date(editSalesEvent.getSale_date());
			existingSalesEvent.setFinal_price(editSalesEvent.getFinal_price());
			existingSalesEvent.setDeleted(editSalesEvent.isDeleted());
			
			return srepo.save(existingSalesEvent);
		} else {
			throw new EntityNotFoundException("SalesEvent not found with id: " + id);
		}
	};
	
	//Find By Id
	@GetMapping("/salesevents/{id}")
	public SalesEvent getSalesEvent(@PathVariable Long id) {
		Optional<SalesEvent> salesevent = srepo.findById(id);
		if (salesevent.isPresent()) {
			return salesevent.get();
		} else {
			throw new EntityNotFoundException("SalesEvent not found with id " + id);
		}
	};
	
	//Delete
	@DeleteMapping("/salesevents/{id}")
	public void deleteSalesEvent(@PathVariable Long id) {
		if (!srepo.existsById(id)) {
			throw new EntityNotFoundException("SalesEvent not found with id " + id);
		}
		srepo.deleteById(id);
	};

}

