package OP1RKS.TicketGuru.domain;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name= "appuser")

@SQLDelete(sql = "UPDATE appuser SET deleted = true WHERE appuser_id=?")
@Where(clause="deleted=false")
public class AppUser {
	

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "appuser_id" )
	private Long appuser_id;
	
	@NotNull
	@Size(max = 100, message="name is too long")
	private String first_name;
	
	@NotNull
	@Size(max = 100, message="name is too long")
	private String last_name;
	
	@NotNull
	@Email
	private String email;
	
	@NotNull
	@Size(min = 6, message="password is too short")
	private String password;
	
	@NotNull
	private Boolean deleted;
	
	@NotNull
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "userrole_id")
	private UserRole userrole;

	public AppUser() {
		super();
	}

	public AppUser(Long appuser_id, @NotNull @Size(max = 100, message = "name is too long") String first_name,
			@NotNull @Size(max = 100, message = "name is too long") String last_name, @NotNull @Email String email,
			@NotNull @Size(min = 6, message = "password is too short") String password, @NotNull Boolean deleted,
			@NotNull UserRole userrole) {
		super();
		this.appuser_id = appuser_id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.password = password;
		this.deleted = deleted;
		this.userrole = userrole;
	}


	public Long getAppUser_id() {
		return appuser_id;
	}

	public void setAppUser_id(Long appuser_id) {
		this.appuser_id = appuser_id;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public UserRole getRole() {
		return userrole;
	}

	public void setRole(UserRole userrole) {
		this.userrole = userrole;
	}

	@Override
	public String toString() {
		return "User [user_id=" + appuser_id + ", first_name=" + first_name + ", last_name=" + last_name + ", email="
				+ email + ", password=" + password + ", deleted=" + deleted + ", userrole=" + userrole + "]";
	}
	
}
