package OP1RKS.TicketGuru.domain;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Ticket {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long ticket_id;
	private String ticket_code;
	private boolean deleted;
	private double price;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ticket_type_id")
	private TicketType ticketType;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn (name = "eventrecord_id")
	private EventRecord eventRecord;
	
	public Ticket() {
		super();
		
	}

	public Ticket(Long ticket_id, String ticket_code, boolean deleted, double price, TicketType ticketType,
			EventRecord eventRecord) {
		super();
		this.ticket_id = ticket_id;
		this.ticket_code = ticket_code;
		this.deleted = deleted;
		this.price = price;
		this.ticketType = ticketType;
		this.eventRecord = eventRecord;
	}

	public Long getTicket_id() {
		return ticket_id;
	}

	public void setTicket_id(Long ticket_id) {
		this.ticket_id = ticket_id;
	}

	public String getTicket_code() {
		return ticket_code;
	}

	public void setTicket_code(String ticket_code) {
		this.ticket_code = ticket_code;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public TicketType getTicketType() {
		return ticketType;
	}

	public void setTicketType(TicketType ticketType) {
		this.ticketType = ticketType;
	}

	public EventRecord getEventRecord() {
		return eventRecord;
	}

	public void setEventRecord(EventRecord eventRecord) {
		this.eventRecord = eventRecord;
	}

	@Override
	public String toString() {
		return "Ticket [ticket_id=" + ticket_id + ", ticket_code=" + ticket_code + ", deleted=" + deleted + ", price="
				+ price + ", ticketType=" + ticketType + ", eventRecord=" + eventRecord + "]";
	}
	
	
	
	

}
