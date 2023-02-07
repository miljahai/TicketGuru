package OP1RKS.TicketGuru.domain;

import java.time.LocalTime;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

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
	private String eventrecord_name;
	
	private Date event_date;
	
	private LocalTime event_starttime, event_endtime;
	
	private boolean deleted;

	public EventRecord(Long eventrecord_id, @Size(max = 100, message = "name is too long") String eventrecord_name,
			Date event_date, LocalTime event_starttime, LocalTime event_endtime, boolean deleted) {
		super();
		this.eventrecord_id = eventrecord_id;
		this.eventrecord_name = eventrecord_name;
		this.event_date = event_date;
		this.event_starttime = event_starttime;
		this.event_endtime = event_endtime;
		this.deleted = deleted;
	}

	public EventRecord() {

	}

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

	public Date getEvent_date() {
		return event_date;
	}

	public void setEvent_date(Date event_date) {
		this.event_date = event_date;
	}

	public LocalTime getEvent_starttime() {
		return event_starttime;
	}

	public void setEvent_starttime(LocalTime event_starttime) {
		this.event_starttime = event_starttime;
	}

	public LocalTime getEvent_endtime() {
		return event_endtime;
	}

	public void setEvent_endtime(LocalTime event_endtime) {
		this.event_endtime = event_endtime;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	@Override
	public String toString() {
		return "EventRecord [eventrecord_id=" + eventrecord_id + ", eventrecord_name=" + eventrecord_name
				+ ", event_date=" + event_date + ", event_starttime=" + event_starttime + ", event_endtime="
				+ event_endtime + ", deleted=" + deleted + "]";
	}
	
}