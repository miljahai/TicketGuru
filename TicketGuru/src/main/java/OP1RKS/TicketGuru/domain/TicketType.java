package OP1RKS.TicketGuru.domain;

import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name= "ticketType")

@SQLDelete(sql = "UPDATE ticket_type SET deleted = true WHERE ticket_type_id=?")
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
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn (name = "eventrecord_id")
	private EventRecord eventRecord;

	public TicketType() {
		super();
	}
	
	public TicketType(String name, double price, boolean deleted, EventRecord eventRecord) {
		this.name = name;
		this.price = price;
		this.deleted = deleted;
		this.eventRecord = eventRecord;
	}

	public TicketType(Long ticket_type_id, String name, double price, boolean deleted, EventRecord eventRecord) {
		super();
		this.ticket_type_id = ticket_type_id;
		this.name = name;
		this.price = price;
		this.deleted = deleted;
		this.eventRecord = eventRecord;
	}

	public TicketType(Long ticket_type_id, String name, double price, boolean deleted, EventRecord eventRecord, List<Ticket> tickets) {
		super();
		this.ticket_type_id = ticket_type_id;
		this.name = name;
		this.price = price;
		this.deleted = deleted;
		this.eventRecord = eventRecord;
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
	
	public EventRecord getEventRecord() {
		return eventRecord;
	}

	public void setEventRecord(EventRecord eventRecord) {
		this.eventRecord = eventRecord;
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
				+ deleted + ", tickets=" + tickets + ", eventRecord=" + eventRecord + "]";
	}

	
	
	

}
