package OP1RKS.TicketGuru;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import OP1RKS.TicketGuru.config.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

	/*
    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails user1 = User.withUsername("user1")
                .password(passwordEncoder().encode("user1Pass"))
                .roles("USER")
                .build();
            UserDetails user2 = User.withUsername("user2")
                .password(passwordEncoder().encode("user2Pass"))
                .roles("USER")
                .build();
            UserDetails admin = User.withUsername("admin")
                .password(passwordEncoder().encode("adminPass"))
                .roles("ADMIN")
                .build();
            return new InMemoryUserDetailsManager(user1, user2, admin);
    }
    
    private static final AntPathRequestMatcher[] WHITE_LIST_URLS = {
            new AntPathRequestMatcher("/events"),
            new AntPathRequestMatcher("/events/**"),
            new AntPathRequestMatcher("/tickettypes"),
            new AntPathRequestMatcher("/tickettypes/**"),
            new AntPathRequestMatcher("/tickets"),
            new AntPathRequestMatcher("/tickets/**"),
            new AntPathRequestMatcher("/salesevents"),
            new AntPathRequestMatcher("/salesevents/**"),
            new AntPathRequestMatcher("/auth"),
            new AntPathRequestMatcher("/auth/**"),
            new AntPathRequestMatcher("/login*"),
            new AntPathRequestMatcher("/h2-console"),
            new AntPathRequestMatcher("/h2-console/**")
    };
    */

	private JwtAuthenticationFilter jwtAuthFilter;
	private AuthenticationProvider authenticationProvider; 

	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		// Vanha koodi:
		/*
		http.headers().frameOptions().sameOrigin().and();
				http.authorizeHttpRequests()
        .requestMatchers(WHITE_LIST_URLS)
        .permitAll();
		http.csrf().disable();
		*/
		
		// Uudi koodi, JWT:
		http
			.csrf()
			.disable()
			.authorizeHttpRequests()
			.requestMatchers("/auth/**","h2-console/**")
			.permitAll()
			.anyRequest()
			.authenticated()
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authenticationProvider(authenticationProvider)
			.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
			;
		
		
		return http.build();
		
    }
    
    @Bean 
    public PasswordEncoder passwordEncoder() { 
        return new BCryptPasswordEncoder(); 
    }
}