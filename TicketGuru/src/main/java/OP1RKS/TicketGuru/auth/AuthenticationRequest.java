package OP1RKS.TicketGuru.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {
	// 	Entity for handling of incoming JWT authentication requests
	//	Uses lombok to autogenerate functions
	
	private String email;
	private String password;
	
}
