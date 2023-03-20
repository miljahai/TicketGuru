package OP1RKS.TicketGuru.domain;

import java.util.Collection;
import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name= "appuser")
@SQLDelete(sql = "UPDATE appuser SET deleted = true WHERE appuser_id=?")
@Where(clause="deleted=false")
public class AppUser implements UserDetails {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "appuser_id" )
	private Long appuser_id;
	
	@NotNull
	@Size(max = 100, message="name is too long")
	private String firstname;
	
	@NotNull
	@Size(max = 100, message="name is too long")
	private String lastname;
	
	@NotNull
	@Email
	private String email;
	
	@NotNull
	@Size(min = 6, message="password is too short")
	private String password;
	
	@NotNull
	private Boolean deleted;
	
	@Enumerated(EnumType.STRING)
	private UserRole userrole;
	
	
	// From UserDetails
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(userrole.name()));
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
	

	public AppUser() {
		super();
	}

	public AppUser(@NotNull @Size(max = 100, message = "name is too long") String firstname,
			@NotNull @Size(max = 100, message = "name is too long") String lastname, @NotNull @Email String email,
			@NotNull @Size(min = 6, message = "password is too short") String password,	@NotNull UserRole userrole) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.password = password;
		this.deleted = false;
		this.userrole = userrole;
	}
	
	public AppUser(@NotNull @Email String email ) {
		this.email = email;
	}

	
	// From class
	public Long getAppUser_id() {
		return appuser_id;
	}

	public void setAppUser_id(Long appuser_id) {
		this.appuser_id = appuser_id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirst_name(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLast_name(String lastname) {
		this.lastname = lastname;
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
		return "User [user_id=" + appuser_id + ", firstname=" + firstname + ", lastname=" + lastname + ", email="
				+ email + ", password=" + password + ", deleted=" + deleted + ", userrole=" + userrole + "]";
	}
}
