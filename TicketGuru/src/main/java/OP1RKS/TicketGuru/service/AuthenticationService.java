package OP1RKS.TicketGuru.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import OP1RKS.TicketGuru.auth.AuthenticationRequest;
import OP1RKS.TicketGuru.auth.AuthenticationResponse;
import OP1RKS.TicketGuru.auth.RegisterRequest;
import OP1RKS.TicketGuru.domain.AppUser;
import OP1RKS.TicketGuru.domain.AppUserRepository;
import OP1RKS.TicketGuru.domain.UserRole;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	
	// Palvelu autentikoi auth/register ja auth/authenticate -kutsut. Palauttaa JWT:n.
	
	
	private final AppUserRepository urepo;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	
	
	/*
	 * 	Rekisteröi = luo uuden käyttäjän. Tiedot kasataan POST-kutsun perusteella.
	 *  Kutsun muoto:
	 *  {
	 *  	"firstname":"Test2",
	 *  	"lastname":"Admin2",
	 *  	"email":"test2.admin2@ticketguru.com",
	 *  	"password":"sala1234"
	 *  }
	 * 	Palauttaa Tokenin
	 */
	public AuthenticationResponse register(RegisterRequest request) {
		var user = AppUser.builder()
				.firstname(request.getFirstname())
				.lastname(request.getLastname())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.userrole(UserRole.SALES)
				.build();
		urepo.save(user);
		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder()
				.token(jwtToken)
				.build();
	}
	
	
	
	/*	Tarkistaa onko POST-kutsussa oleva käyttäjä AppUserRepositoryssa.
	 * 	Kutsun muoto:
	 * 	{
     *		"email":"test.admin@ticketguru.com",
     *		"password":"sala1234"
	 *	}
	 *	Palauttaa Tokenin
	 */
	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getEmail(),
						request.getPassword()
						)
				);
				var user = urepo.findByEmail(request.getEmail())
						.orElseThrow();
				var jwtToken = jwtService.generateToken(user);
				return AuthenticationResponse.builder()
						.token(jwtToken)
						.build();
	}
	
}
