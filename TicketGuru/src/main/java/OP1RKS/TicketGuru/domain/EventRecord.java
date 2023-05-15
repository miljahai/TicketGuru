package OP1RKS.TicketGuru.domain;

import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonIgnore;

// TODO: set to use Lombok

@Entity
@Table(name = "eventrecord")
// SQLDelete and Where rows turn deletion to soft. 
// SQLDelete changes delete to set 'deleted' value to true. 
// Where filters items with deleted=true from queries.
@SQLDelete(sql = "UPDATE eventrecord SET deleted = true WHERE eventrecord_id=?")
@Where(clause ="deleted=false")
public class EventRecord {

	//Properties
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "eventrecord_id" )
	private Long eventrecord_id;
	
	@NotNull
	@Size(max = 100, message="name is too long")
	private String eventrecord_name;
	
	@Size(max = 100, message="too long")
	private String venue, city;
	
	@Min(value = 0, message="number of tickets cannot be negative")
	private int ticketsmax;
	
	@NotNull
	private LocalDateTime event_starttime, event_endtime;
	
	private boolean deleted;
	
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.PERSIST, mappedBy = "ticket_type_id")
	private List<TicketType> tickettypes;
	
	
	// Constructors
	public EventRecord() {}

	// without id for creating a new Event
	public EventRecord(@NotNull @Size(max = 100, message = "name is too long") String eventrecord_name,
			@Size(max = 100, message = "too long") String venue, @Size(max = 100, message = "too long") String city,
			@Min(value = 0, message = "number of tickets cannot be negative") int ticketsmax,
			@NotNull LocalDateTime event_starttime, @NotNull LocalDateTime event_endtime, boolean deleted) {
		this.eventrecord_name = eventrecord_name;
		this.venue = venue;
		this.city = city;
		this.ticketsmax = ticketsmax;
		this.event_starttime = event_starttime;
		this.event_endtime = event_endtime;
		this.deleted = deleted;
	}
	
	// with id for updating an existing Event
	public EventRecord(Long eventrecord_id,
			@NotNull @Size(max = 100, message = "name is too long") String eventrecord_name,
			@Size(max = 100, message = "too long") String venue, @Size(max = 100, message = "too long") String city,
			@Min(value = 0, message = "number of tickets cannot be negative") int ticketsmax,
			@NotNull LocalDateTime event_starttime, @NotNull LocalDateTime event_endtime, boolean deleted) {
		this.eventrecord_id = eventrecord_id;
		this.eventrecord_name = eventrecord_name;
		this.venue = venue;
		this.city = city;
		this.ticketsmax = ticketsmax;
		this.event_starttime = event_starttime;
		this.event_endtime = event_endtime;
		this.deleted = deleted;
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

	
	public List<TicketType> getTickettypes() {
		return tickettypes;
	}

	public void setTickettypes(List<TicketType> tickettypes) {
		this.tickettypes = tickettypes;
	}

	
	@Override
	public String toString() {
		return "EventRecord [eventrecord_id=" + eventrecord_id + ", eventrecord_name=" + eventrecord_name + ", venue="
				+ venue + ", city=" + city + ", ticketsmax=" + ticketsmax + ", event_starttime=" + event_starttime
				+ ", event_endtime=" + event_endtime + ", deleted=" + deleted + ", tickettypes=" + tickettypes + "]";
	}
	
}
	
	