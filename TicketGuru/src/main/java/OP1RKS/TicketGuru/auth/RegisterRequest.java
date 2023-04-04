package OP1RKS.TicketGuru.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

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
	private String password;	
	
}
