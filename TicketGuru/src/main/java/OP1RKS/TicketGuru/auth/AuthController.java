package OP1RKS.TicketGuru.auth;

import lombok.RequiredArgsConstructor;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import OP1RKS.TicketGuru.service.AuthenticationService;




@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	
	protected final Log logger = LogFactory.getLog(getClass());
	
	@Autowired
	private final AuthenticationService aservice;
	
	@Autowired
	final AuthenticationManager authenticationManager;
	
    
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(
			@RequestBody RegisterRequest request
	) {
		return ResponseEntity.ok(aservice.register(request));
	}
	
	
	@PostMapping("/authenticate")
	public ResponseEntity<AuthenticationResponse> register(
			@RequestBody AuthenticationRequest request
	) {
			return ResponseEntity.ok(aservice.authenticate(request));
	}

}