package OP1RKS.TicketGuru;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import OP1RKS.TicketGuru.config.JwtAuthenticationFilter;
import OP1RKS.TicketGuru.exception.CustomAccessDeniedHandler;
import OP1RKS.TicketGuru.exception.CustomAuthenticationFailureHandler;
import lombok.RequiredArgsConstructor;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class WebSecurityConfig {
	
	private final JwtAuthenticationFilter jwtAuthFilter;
	private final AuthenticationProvider authenticationProvider; 
	
	@Autowired
	CustomAccessDeniedHandler accessDeniedHandler;
	@Autowired
	CustomAuthenticationFailureHandler authenticationFailureHandler;
    
	// TODO: tätä listaa pitää siivota
    private static final AntPathRequestMatcher[] WHITE_LIST_URLS = {
    		new AntPathRequestMatcher("/auth"),
    		new AntPathRequestMatcher("/auth/**"),
            new AntPathRequestMatcher("/login*"),
            new AntPathRequestMatcher("/h2-console"),
            new AntPathRequestMatcher("/h2-console/**")
    };
	
	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		// JWT-koodi
		// kaikkien toimintojuen pitäisi edellyttää JWT:ta
		// vaatii ehkä korjauksia
		// kts. https://github.com/ali-bouali/spring-boot-3-jwt-security/blob/main/src/main/java/com/alibou/security/config/SecurityConfiguration.java
		http
			.csrf()
			.disable()
			.headers()
			.frameOptions()
			.sameOrigin()
			.and()
			.authorizeHttpRequests()
			.requestMatchers("/users").hasRole("ADMIN")
			.requestMatchers("/auth/register").hasRole("ADMIN")
			.requestMatchers("/events").authenticated()
			.requestMatchers("/tickets").authenticated()
			.requestMatchers("/tickets/**").authenticated()
			.requestMatchers("/tickettypes").authenticated()
			.requestMatchers("/salesevents").authenticated()
			.requestMatchers("/salesevents/**").authenticated()
			.requestMatchers(HttpMethod.GET, "/events").permitAll()
			.requestMatchers(HttpMethod.GET, "/events/**").permitAll()
			.requestMatchers(HttpMethod.POST, "/events").hasAnyRole("ADMIN", "EVENTS")
			.requestMatchers(HttpMethod.PUT, "/events/**").hasAnyRole("ADMIN", "EVENTS")
			.requestMatchers(HttpMethod.DELETE, "/events/**").hasAnyRole("ADMIN", "EVENTS")
			.requestMatchers(HttpMethod.GET, "/tickettypes").permitAll()
			.requestMatchers(HttpMethod.GET, "/tickettypes/**").permitAll()
			.requestMatchers(HttpMethod.POST, "/tickettypes").hasAnyRole("ADMIN", "EVENTS")
			.requestMatchers(HttpMethod.PUT, "/tickettypes/**").hasAnyRole("ADMIN", "EVENTS")
			.requestMatchers(HttpMethod.DELETE, "/tickettypes/**").hasAnyRole("ADMIN", "EVENTS")
			.requestMatchers(HttpMethod.DELETE, "/salesevents/**").hasAnyRole("ADMIN", "EVENTS")
			.requestMatchers(WHITE_LIST_URLS)
				.permitAll()
			.and()
			.formLogin()
				.permitAll()
				.loginProcessingUrl("/auth")
				.failureHandler(authenticationFailureHandler)
			.and()
			.httpBasic()
			.and()
            .exceptionHandling()
            .accessDeniedHandler(accessDeniedHandler)
			.and()
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authenticationProvider(authenticationProvider)
			.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
	
		
		return http.build();
		
    }

	
}