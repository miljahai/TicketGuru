package OP1RKS.TicketGuru.domain;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
	@JoinColumn(name = "appuser_id")
	private AppUser appuser;
	
	private LocalDateTime sale_date;
	private double price;
	private boolean deleted;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "salesEvent")
	private List<Ticket> tickets;	
	
	
	public SalesEvent(LocalDateTime sale_date, double price, boolean deleted) {
		super();
		this.sale_date = sale_date;
		this.price = price;
		this.deleted = deleted;
	}

	public SalesEvent(Long salesevent_id, AppUser appuser, LocalDateTime sale_date, double price, boolean deleted) {
		super();
		this.salesevent_id = salesevent_id;
		this.appuser = appuser;
		this.sale_date = sale_date;
		this.price = price;
		this.deleted = deleted;
	}
	
	
	public SalesEvent(LocalDateTime sale_date, double price, boolean deleted, List<Ticket> tickets) {
		super();
		this.sale_date = sale_date;
		this.price = price;
		this.deleted = deleted;
		this.tickets = tickets;
	}

	public SalesEvent(Long salesevent_id) {
		super();
		this.salesevent_id = salesevent_id;
	}

	public SalesEvent() {
		super();
		
	}

	public SalesEvent(LocalDateTime of, double d, boolean b, Ticket orElse) {
		// TODO Auto-generated constructor stub
	}

	public AppUser getAppUser() {
		return appuser;
	}

	public void setAppUser(AppUser appuser) {
		this.appuser = appuser;
	}

	
	public Long getSalesevent_id() {
		return salesevent_id;
	}

	public void setSalesevent_id(Long salesevent_id) {
		this.salesevent_id = salesevent_id;
	}

	public LocalDateTime getSale_date() {
		return sale_date;
	}

	public void setSale_date(LocalDateTime sale_date) {
		this.sale_date = sale_date;
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
		return "SalesEvent [salesevent_id=" + salesevent_id + ", appuser=" + appuser + ", sale_date=" + sale_date
				+ ", price=" + price + ", deleted=" + deleted + "]";
	}



	
	
	
}
