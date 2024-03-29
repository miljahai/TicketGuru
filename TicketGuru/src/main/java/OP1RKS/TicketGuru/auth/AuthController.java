package OP1RKS.TicketGuru.auth;

import lombok.RequiredArgsConstructor;

import java.util.Collections;
import java.util.Optional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import OP1RKS.TicketGuru.domain.AppUser;
import OP1RKS.TicketGuru.domain.AppUserRepository;
import OP1RKS.TicketGuru.service.AuthenticationService;
import OP1RKS.TicketGuru.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000/", "http://localhost:8080", "https://cen-cenru4.azurewebsites.net", "https://miljahai.github.io"}, allowCredentials = "true")
public class AuthController {
	// Controller for handling authentication requests and responses
	
	protected final Log logger = LogFactory.getLog(getClass());
	
	@Autowired
	private final AuthenticationService aservice;
	@Autowired
	private final AuthenticationManager authenticationManager;
	@Autowired JwtService jwtservice;
	@Autowired
	private AppUserRepository urepo;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	// Create a new user
    // Validates password using a regular expression
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@Valid
			@RequestBody RegisterRequest request
	) {
		String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&*?])[A-Za-z\\d#$@!%&*?]{8,30}$";
        String password = request.getPassword();
        
        if (!password.matches(passwordRegex)) {
        	throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
        			"{\"message\":\"The password must be between 8 and 30 characters long and include at least one uppercase letter, one lowercase letter, one special character, and one number.\"}");
        }
     // Calls the register method of the AuthenticationService and returns the result as a ResponseEntity object
		return ResponseEntity.ok(aservice.register(request));
	}
	
	// Authenticate a user
	@PostMapping("/authenticate")
	public ResponseEntity<AuthenticationResponse> register(
			@RequestBody AuthenticationRequest request
	) {
			return ResponseEntity.ok(aservice.authenticate(request));
	}
	
	// Log in a user and return a JWT token in the Authorization header
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AuthenticationRequest request) {
        try {
        	// Authenticates the user using the AuthenticationManager
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getEmail(), request.getPassword())); 

            AppUser user = (AppUser) authenticate.getPrincipal();
            // Generates a JWT token and adds it to the Authorization header of the response
            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, jwtservice.generateToken(user))
                    .body(user);  // Returns the user object in the response body
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "Invalid email or password"));
        }
    }
	// Validate a JWT token
	// /auth/validate?token={jwt-token}
	@GetMapping("/validate")
	public ResponseEntity<?> validateToken (@RequestParam String token, @AuthenticationPrincipal AppUser user) {
		try {
			// Checks if the token is valid using the JwtService
			Boolean isTokenValid = jwtservice.isTokenValid(token, user);
			return ResponseEntity.ok(isTokenValid);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.ok(false);
		}
		
	}
	
	// Changes password
	@PutMapping("/change-password")
	public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
	    Optional<AppUser> user = urepo.findByEmail(changePasswordRequest.getEmail());
	    
	    if (user.isPresent() && passwordEncoder.matches(changePasswordRequest.getCurrentPassword() , user.get().getPassword())) {
	        // The user exists and the old password matches the stored password
	        // Update the password in the database and return a success response
	        user.get().setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
	        urepo.save(user.get());
	        return ResponseEntity.ok("Password updated successfully");
	    } else {
	        // The user does not exist or the old password does not match the stored password
	        // Return an error response
	        return ResponseEntity.badRequest().body("Invalid current password");
	    }
	}


}