package OP1RKS.TicketGuru.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import OP1RKS.TicketGuru.domain.AppUserRepository;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
	
	@Autowired
	private final AppUserRepository urepo;
	
	// Returns an implementation of Spring Security's UserDetailsService interface that retrieves user details from the AppUserRepository
	@Bean
	public UserDetailsService userDetailsService() {
		return username -> urepo.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
	}
	// Returns an implementation of Spring Security's AuthenticationProvider interface that uses the userDetailsService and passwordEncoder
	@Bean
	public AuthenticationProvider authenticationProvider() {
		
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService());
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;		
	}
	// Returns an instance of Spring Security's AuthenticationManager, which delegates to the authenticationProvider to perform authentication
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
	// Returns an instance of Spring Security's PasswordEncoder interface that uses the BCrypt algorithm to hash passwords
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
}
