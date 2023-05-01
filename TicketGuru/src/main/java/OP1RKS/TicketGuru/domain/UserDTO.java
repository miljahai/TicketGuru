package OP1RKS.TicketGuru.domain;

import org.hibernate.annotations.SQLDelete;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
    private String firstname;
    private String lastname;
    private String email;
    private UserRole userrole;

    public UserDTO(AppUser appUser) {
        this.id = appUser.getAppuser_id();
        this.firstname = appUser.getFirstname();
        this.lastname = appUser.getLastname();
        this.email = appUser.getEmail();
        this.userrole = appUser.getUserrole();
    }
	
}
