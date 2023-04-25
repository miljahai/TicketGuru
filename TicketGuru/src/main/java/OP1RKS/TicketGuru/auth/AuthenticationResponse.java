package OP1RKS.TicketGuru.auth;

import OP1RKS.TicketGuru.domain.AppUser;
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
    private AppUser user;
    
}