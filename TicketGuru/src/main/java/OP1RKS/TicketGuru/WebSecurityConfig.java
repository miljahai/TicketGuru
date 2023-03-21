package OP1RKS.TicketGuru;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import OP1RKS.TicketGuru.config.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    
    private static final AntPathRequestMatcher[] WHITE_LIST_URLS = {
    		new AntPathRequestMatcher("/auth"),
    		new AntPathRequestMatcher("/auth/**"),
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
    

	private final JwtAuthenticationFilter jwtAuthFilter;
	private final AuthenticationProvider authenticationProvider; 

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
			.headers()
			.frameOptions()
			.sameOrigin()
			.and()
			.authorizeHttpRequests()
			.requestMatchers(WHITE_LIST_URLS)
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
    
}