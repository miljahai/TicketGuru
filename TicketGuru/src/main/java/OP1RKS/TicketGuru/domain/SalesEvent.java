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
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "salesevent")
//SQLDelete and Where rows turn deletion to soft. 
//SQLDelete changes delete to set 'deleted' value to true. 
//Where filters items with deleted=true from queries.
@SQLDelete(sql = "UPDATE salesevent SET deleted = true WHERE salesevent_id=?")
@Where(clause ="deleted=false")

public class SalesEvent {
	
	// Properties
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "salesevent_id")
	private Long salesevent_id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "appuser_id")
	private AppUser appuser;
	
	@NotNull
	private LocalDateTime sale_date;
	
	@Min(value = 0, message="price cannot be negative")
	private double final_price;
	
	@NotNull
	private boolean deleted;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "salesEvent")
	private List<Ticket> tickets;	
	
	// Constructors
	
	// constructor to create salesevent without user or tickets
	public SalesEvent(@NotNull LocalDateTime sale_date, @Min(value = 0, message="price cannot be negative") double final_price, @NotNull boolean deleted) {
		super();
		this.sale_date = sale_date;
		this.final_price = final_price;
		this.deleted = deleted;
	}

	// constructor to create salesevent with user but without tickets
	public SalesEvent(AppUser appuser, @NotNull LocalDateTime sale_date, @Min(value = 0, message="price cannot be negative") double final_price, @NotNull boolean deleted) {
		this.appuser = appuser;
		this.sale_date = sale_date;
		this.final_price = final_price;
		this.deleted = deleted;
	}
	
	// constructor to create salesevent with tickets but without user
	public SalesEvent(LocalDateTime sale_date, @Min(value = 0, message="price cannot be negative") double final_price, @NotNull boolean deleted, List<Ticket> tickets) {
		super();
		this.sale_date = sale_date;
		this.final_price = final_price;
		this.deleted = deleted;
		this.tickets = tickets;
	}

	// with only id to create and empty salesevent
	public SalesEvent(Long salesevent_id) {
		super();
		this.salesevent_id = salesevent_id;
	}

	public SalesEvent() { }

	// MITÄ TÄMÄ TEKEE?
	public SalesEvent(LocalDateTime of, double d, boolean b, Ticket orElse) {
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

	public double getFinal_price() {
		return final_price;
	}

	public void setFinal_price(double final_price) {
		this.final_price = final_price;
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
				+ ", final_price=" + final_price + ", deleted=" + deleted + "]";
	}



	
	
	
}
