package OP1RKS.TicketGuru.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "eventrecord")
// Alla olevat rivit varmistavat, että Delete-kutsu ei poista eventrecord-riviä kannasta vaan muuttaa deleted arvon trueksi. @Where tekee sen, että vain deleted=false rivit haetaan,
@SQLDelete(sql = "UPDATE eventrecord SET deleted = true WHERE eventrecord_id=?")
@Where(clause ="deleted=false")
public class EventRecord {

	//Properties
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "eventrecord_id" )
	private Long eventrecord_id;
	
	@Size(max = 100, message="name is too long")
	@NotNull
	private String eventrecord_name, venue, city;
	
	private int ticketsmax;
	
	@NotNull
	private LocalDateTime event_starttime;
	
	private LocalDateTime event_endtime;
	
	private boolean deleted;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "ticket_id")
	private List<Ticket> tickets;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "ticket_type_id")
	private List<TicketType> tickettypes;
	
	
	// Constructors
	public EventRecord(Long eventrecord_id,
			@Size(max = 100, message = "name is too long") @NotNull String eventrecord_name,
			@Size(max = 100, message = "name is too long") @NotNull String venue,
			@Size(max = 100, message = "name is too long") @NotNull String city, int ticketsmax,
			@NotNull LocalDateTime event_starttime, LocalDateTime event_endtime, boolean deleted) {
		super();
		this.eventrecord_id = eventrecord_id;
		this.eventrecord_name = eventrecord_name;
		this.venue = venue;
		this.city = city;
		this.ticketsmax = ticketsmax;
		this.event_starttime = event_starttime;
		this.event_endtime = event_endtime;
		this.deleted = deleted;
	}

	public EventRecord(@Size(max = 100, message = "name is too long") @NotNull String eventrecord_name,
			@Size(max = 100, message = "name is too long") @NotNull String venue,
			@Size(max = 100, message = "name is too long") @NotNull String city, int ticketsmax,
			@NotNull LocalDateTime event_starttime, LocalDateTime event_endtime, boolean deleted) {
		this.eventrecord_name = eventrecord_name;
		this.venue = venue;
		this.city = city;
		this.ticketsmax = ticketsmax;
		this.event_starttime = event_starttime;
		this.event_endtime = event_endtime;
		this.deleted = deleted;
	}

	public EventRecord() {
		super();
	}

	
	// Getters and Setters
	public Long getEventrecord_id() {
		return eventrecord_id;
	}

	public void setEventrecord_id(Long eventrecord_id) {
		this.eventrecord_id = eventrecord_id;
	}

	public String getEventrecord_name() {
		return eventrecord_name;
	}

	public void setEventrecord_name(String eventrecord_name) {
		this.eventrecord_name = eventrecord_name;
	}

	public String getVenue() {
		return venue;
	}

	public void setVenue(String venue) {
		this.venue = venue;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public int getTicketsmax() {
		return ticketsmax;
	}

	public void setTicketsmax(int ticketsmax) {
		this.ticketsmax = ticketsmax;
	}

	public LocalDateTime getEvent_starttime() {
		return event_starttime;
	}

	public void setEvent_starttime(LocalDateTime event_starttime) {
		this.event_starttime = event_starttime;
	}

	public LocalDateTime getEvent_endtime() {
		return event_endtime;
	}

	public void setEvent_endtime(LocalDateTime event_endtime) {
		this.event_endtime = event_endtime;
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

	public List<TicketType> getTickettypes() {
		return tickettypes;
	}

	public void setTickettypes(List<TicketType> tickettypes) {
		this.tickettypes = tickettypes;
	}

	
	// ToString
	@Override
	public String toString() {
		return "EventRecord [eventrecord_id=" + eventrecord_id + ", eventrecord_name=" + eventrecord_name + ", venue="
				+ venue + ", city=" + city + ", ticketsmax=" + ticketsmax + ", event_starttime=" + event_starttime
				+ ", event_endtime=" + event_endtime + ", deleted=" + deleted + ", tickets= + tickets"
				+ ", tickettypes= + tickettypes" + "]";
	}
	
}
	
	