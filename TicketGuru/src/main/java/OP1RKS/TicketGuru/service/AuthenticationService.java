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
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	
	// This service authenticates auth/register and auth/authenticate calls and returns the JWT.
	
	private final AppUserRepository urepo;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	
	
	/*
	 * 	Register = create a new user. User details are parsed from the POST call.
	 *  Payload format:
	 *  {
	 *  	"firstname":"Test2",
	 *  	"lastname":"Admin2",
	 *  	"email":"test2.admin2@ticketguru.com",
	 *  	"password":"sala1234"
	 *  }
	 * 	Returns the JWT or an error
	 */
	public AuthenticationResponse register(RegisterRequest request){
		if (urepo.findByEmail(request.getEmail()).isPresent()) {
	        throw new EntityExistsException("Email already exists");
	    }
		var user = AppUser.builder()
				.firstname(request.getFirstname())
				.lastname(request.getLastname())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.userrole(UserRole.SALES)
				.build();
		urepo.save(user);
		var jwtToken = jwtService.generateToken(user);
		return new AuthenticationResponse(jwtToken, user);
	}
	
	/*	Validate if the user in the POST call exists in the AppUserRepositoryssa.
	 * 	Payload format:
	 * 	{
     *		"email":"test.admin@ticketguru.com",
     *		"password":"sala1234"
	 *	}
	 *	Returns the JWT or an error
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
