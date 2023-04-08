package OP1RKS.TicketGuru.domain;

import java.time.LocalDateTime;
import java.util.UUID;

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
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name= "ticket")
@SQLDelete(sql = "UPDATE ticket SET deleted = true WHERE ticket_id=?")
@Where(clause="deleted=false")
public class Ticket {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long ticket_id;
	
	@Column(name="ticket_code", nullable=false, unique=true)
	@Size(max = 50, message="code is too long")
	private final String ticket_code = UUID.randomUUID().toString();
	
	@NotNull
	private boolean deleted;
	
	private LocalDateTime used;
	
	@NotNull
	@Min(value = 0, message="price cannot be negative")
	private double price;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ticket_type_id")
	private TicketType ticketType;
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "salesevent_id")
	private SalesEvent salesEvent;


}
