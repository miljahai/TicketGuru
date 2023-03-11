package OP1RKS.TicketGuru.domain;

import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import jakarta.persistence.Id;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name= "userrole")

@SQLDelete(sql = "UPDATE userrole SET deleted = true WHERE userrrole_id=?")
@Where(clause="deleted=false")
public class UserRole {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long userrole_id;
	
	@NotNull
	@Size(max = 100, message="name is too long")
	private String userrole_name;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy ="appuser_id")
	private List<AppUser>appusers;
	
	public UserRole() {
		super();
	}

	public UserRole(Long userrole_id, @NotNull @Size(max = 100, message = "name is too long") String userrole_name) {
		super();
		this.userrole_id = userrole_id;
		this.userrole_name = userrole_name;
	}

	public Long getUserRole_id() {
		return userrole_id;
	}

	public void setUserRole_id(Long userrole_id) {
		this.userrole_id = userrole_id;
	}

	public String getUserRole_name() {
		return userrole_name;
	}

	public void setUserRole_name(String userrole_name) {
		this.userrole_name = userrole_name;
	}

	public List<AppUser> getAppUsers() {
		return appusers;
	}

	public void setUsers(List<AppUser> appusers) {
		this.appusers = appusers;
	}

	@Override
	public String toString() {
		return "Role [userrole_id=" + userrole_id + ", userrole_name=" + userrole_name + "]";
	}
	
}
