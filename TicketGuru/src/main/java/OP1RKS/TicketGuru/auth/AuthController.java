package OP1RKS.TicketGuru.auth;

import lombok.RequiredArgsConstructor;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import OP1RKS.TicketGuru.service.AuthenticationService;
import jakarta.validation.Valid;




@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	
	protected final Log logger = LogFactory.getLog(getClass());
	
	@Autowired
	private final AuthenticationService aservice;
	
    
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@Valid
			@RequestBody RegisterRequest request
	) {
		String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&*?])[A-Za-z\\d#$@!%&*?]{8,30}$";
        String password = request.getPassword();

        if (!password.matches(passwordRegex)) {
        	throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
        	"The password must be between 8 and 30 characters long and include at least one uppercase letter, one lowercase letter, one special character, and one number.");
        }
		return ResponseEntity.ok(aservice.register(request));
	}
	
	
	@PostMapping("/authenticate")
	public ResponseEntity<AuthenticationResponse> register(
			@RequestBody AuthenticationRequest request
	) {
			return ResponseEntity.ok(aservice.authenticate(request));
	}


}