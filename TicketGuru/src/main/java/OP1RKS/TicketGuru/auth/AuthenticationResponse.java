package OP1RKS.TicketGuru.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

	private String token;

	
	
	public AuthenticationResponse() {
		super();
	}
	
	public AuthenticationResponse(String token) {
		super();
		this.token = token;
	}



	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	
}
