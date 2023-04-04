package OP1RKS.TicketGuru.domain;

import java.time.LocalDateTime;

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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
