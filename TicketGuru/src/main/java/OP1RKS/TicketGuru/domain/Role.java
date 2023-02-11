package OP1RKS.TicketGuru.domain;

import java.util.List;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name= "role")
public class Role {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long role_id;
	
	@NotNull
	@Size(max = 100, message="name is too long")
	private String role_name;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy ="ticketType")
	private List<User>users;
	
	public Role() {
		super();
	}

	public Role(Long role_id, @NotNull @Size(max = 100, message = "name is too long") String role_name) {
		super();
		this.role_id = role_id;
		this.role_name = role_name;
	}

	public Role(Long role_id, @NotNull @Size(max = 100, message = "name is too long") String role_name,
			List<User> users) {
		super();
		this.role_id = role_id;
		this.role_name = role_name;
		this.users = users;
	}

	public Long getRole_id() {
		return role_id;
	}

	public void setRole_id(Long role_id) {
		this.role_id = role_id;
	}

	public String getRole_name() {
		return role_name;
	}

	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	@Override
	public String toString() {
		return "Role [role_id=" + role_id + ", role_name=" + role_name + "]";
	}
	
}
