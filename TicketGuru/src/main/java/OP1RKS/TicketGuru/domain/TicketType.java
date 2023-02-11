package OP1RKS.TicketGuru.domain;

import java.util.List;
import java.util.Set;
import javax.persistence.ManyToMany;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name= "ticketType")

@SQLDelete(sql = "UPDATE tickeType SET deleted = true WHERE ticket_type_id=?")
@Where(clause="deleted=false")
public class TicketType {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long ticket_type_id;	
	private String name;
	private double price;
	private boolean deleted;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy ="ticketType")
	private List<Ticket>tickets;
	
	@ManyToMany
	Set<EventRecord> eventTicketTypes;

	public TicketType() {
		super();
		
	}

	public TicketType(Long ticket_type_id, String name, double price, boolean deleted) {
		super();
		this.ticket_type_id = ticket_type_id;
		this.name = name;
		this.price = price;
		this.deleted = deleted;
	}

	public TicketType(Long ticket_type_id, String name, double price, boolean deleted, List<Ticket> tickets) {
		super();
		this.ticket_type_id = ticket_type_id;
		this.name = name;
		this.price = price;
		this.deleted = deleted;
		this.tickets = tickets;
	}

	public Long getTicket_type_id() {
		return ticket_type_id;
	}

	public void setTicket_type_id(Long ticket_type_id) {
		this.ticket_type_id = ticket_type_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}

	@Override
	public String toString() {
		return "TicketType [ticket_type_id=" + ticket_type_id + ", name=" + name + ", price=" + price + ", deleted="
				+ deleted + "]";
	}

	
	
	

}
