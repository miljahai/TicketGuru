package OP1RKS.TicketGuru.domain;

import java.util.Collection;
import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("serial")
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
	@JsonIgnore
	private String password;
	
	@Builder.Default
	private Boolean deleted = false;
	
	@Enumerated(EnumType.STRING)
	private UserRole userrole;
		

	public AppUser(@NotNull @Size(max = 100, message = "name is too long") String firstname,
			@NotNull @Size(max = 100, message = "name is too long") String lastname, @NotNull @Email String email,
			@NotNull @Size(min = 6, message = "password is too short") String password, UserRole userrole) {
		super();
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.password = password;
		this.deleted = false;
		this.userrole = userrole;
	}
	
	public AppUser(@NotNull @Size(max = 100, message = "name is too long") String firstname,
			@NotNull @Size(max = 100, message = "name is too long") String lastname, @NotNull @Email String email,
			UserRole userrole) {
		super();
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.deleted = false;
		this.userrole = userrole;
	}
	
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


}
