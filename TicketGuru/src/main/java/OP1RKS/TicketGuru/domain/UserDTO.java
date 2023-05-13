package OP1RKS.TicketGuru.domain;

import org.hibernate.annotations.SQLDelete;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
@SQLDelete(sql = "UPDATE appuser SET deleted = true WHERE appuser_id=?")
public class UserDTO {
	@Id
	private Long id;
	
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
    private UserRole userrole;

    public UserDTO(AppUser appUser) {
        this.id = appUser.getAppuser_id();
        this.firstname = appUser.getFirstname();
        this.lastname = appUser.getLastname();
        this.email = appUser.getEmail();
        this.userrole = appUser.getUserrole();
    }
	
}
