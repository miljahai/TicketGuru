package OP1RKS.TicketGuru.domain;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name= "ticket")

@SQLDelete(sql = "UPDATE ticket SET deleted = true WHERE ticket_id=?")
@Where(clause="deleted=false")
public class Ticket {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long ticket_id;
	
	@Size(max = 50, message="code is too long")
	private String ticket_code;
	
	@NotNull
	private boolean deleted;
	
	@NotNull
	private boolean used;
	
	@NotNull
	@Min(value = 0, message="price cannot be negative")
	private double price;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ticket_type_id")
	private TicketType ticketType;
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "salesevent_id")
	private SalesEvent salesEvent;
	
	
	public Ticket() {
	}	
			
	
	public Ticket(Long ticket_id, @Size(max = 50, message = "code is too long") String ticket_code,
			@NotNull boolean deleted, @NotNull boolean used,
			@NotNull @Min(value = 0, message = "price cannot be negative") double price, TicketType ticketType,
			SalesEvent salesEvent) {
		super();
		this.ticket_id = ticket_id;
		this.ticket_code = ticket_code;
		this.deleted = deleted;
		this.used = used;
		this.price = price;
		this.ticketType = ticketType;
		this.salesEvent = salesEvent;
	}


	public Ticket(@Size(max = 50, message = "code is too long") String ticket_code, @NotNull boolean deleted,
			@NotNull boolean used, @NotNull @Min(value = 0, message = "price cannot be negative") double price,
			TicketType ticketType, SalesEvent salesEvent) {
		super();
		this.ticket_code = ticket_code;
		this.deleted = deleted;
		this.used = used;
		this.price = price;
		this.ticketType = ticketType;
		this.salesEvent = salesEvent;
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
		

	public boolean isUsed() {
		return used;
	}


	public void setUsed(boolean used) {
		this.used = used;
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

	public SalesEvent getSalesEvent() {
		return salesEvent;
	}

	public void setSalesEvent(SalesEvent salesEvent) {
		this.salesEvent = salesEvent;
	}

	@Override
	public String toString() {
		return "Ticket [ticket_id=" + ticket_id + ", ticket_code=" + ticket_code + ", deleted=" + deleted + ", used =" + used + " , price="
				+ price + ", ticketType=" + ticketType + ", salesEvent=" + salesEvent
				+ "]";
	}


}
