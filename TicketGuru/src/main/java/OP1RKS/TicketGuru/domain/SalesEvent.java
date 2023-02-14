package OP1RKS.TicketGuru.domain;

import java.time.LocalTime;
import java.util.Date;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "salesevent")
@SQLDelete(sql = "UPDATE salesevent SET deleted = true WHERE salesevent_id=?")
@Where(clause ="deleted=false")

public class SalesEvent {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "salesevent_id")
	private Long salesevent_id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "eventrecord_id")
	private EventRecord eventrecord_id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "appuser_id")
	private AppUser appuser;
	
	private Date sale_date;
	private LocalTime sale_time;
	private double price;
	private boolean deleted;
	
	public SalesEvent() {
		super();
	}

	public SalesEvent(Long salesevent_id, EventRecord eventrecord_id, AppUser appuser, Date sale_date, LocalTime sale_time,
			double price, boolean deleted) {
		super();
		this.salesevent_id = salesevent_id;
		this.eventrecord_id = eventrecord_id;
		this.appuser = appuser;
		this.sale_date = sale_date;
		this.sale_time = sale_time;
		this.price = price;
		this.deleted = deleted;
	}

	public AppUser getAppUser() {
		return appuser;
	}

	public void setAppUser(AppUser appuser) {
		this.appuser = appuser;
	}

	public Date getSale_date() {
		return sale_date;
	}

	public void setSale_date(Date sale_date) {
		this.sale_date = sale_date;
	}

	public LocalTime getSale_time() {
		return sale_time;
	}

	public void setSale_time(LocalTime sale_time) {
		this.sale_time = sale_time;
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


	@Override
	public String toString() {
		return "SalesEvent [salesevent_id=" + salesevent_id + ", eventrecord=" + eventrecord_id + ", sale_date=" + sale_date
				+ ", sale_time=" + sale_time + ", price=" + price + ", deleted=" + deleted + "]";
	}
	
	
	
}
