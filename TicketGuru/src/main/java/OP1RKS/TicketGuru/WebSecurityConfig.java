package OP1RKS.TicketGuru;

import java.util.Arrays;

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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
            new AntPathRequestMatcher("/login"),
            new AntPathRequestMatcher("/login**"),
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
			.cors()
			.and()
			.csrf()
			.disable()
			.headers()
			.frameOptions()
			.sameOrigin()
			.and()
			.authorizeHttpRequests()
			.requestMatchers("/users").hasAuthority("ADMIN")
			.requestMatchers("/users/**").hasAuthority("ADMIN")
			.requestMatchers("/auth/register").hasAuthority("ADMIN")
			.requestMatchers("/events").authenticated()
			.requestMatchers("/events/**").authenticated()
			.requestMatchers("/tickets").authenticated()
			.requestMatchers("/tickets/**").authenticated()
			.requestMatchers("/qrcode/").authenticated()
			.requestMatchers("/qrcode/**").authenticated()
			.requestMatchers("/tickettypes").authenticated()
			.requestMatchers("/tickettypes/**").authenticated()
			.requestMatchers("/salesevents").authenticated()
			.requestMatchers("/salesevents/**").authenticated()
			.requestMatchers(HttpMethod.POST, "/events").hasAnyAuthority("ADMIN", "EVENTS")
			.requestMatchers(HttpMethod.PUT, "/events/**").hasAnyAuthority("ADMIN", "EVENTS")
			.requestMatchers(HttpMethod.DELETE, "/events/**").hasAnyAuthority("ADMIN", "EVENTS")
			.requestMatchers(HttpMethod.POST, "/tickettypes").hasAnyAuthority("ADMIN", "EVENTS")
			.requestMatchers(HttpMethod.PUT, "/tickettypes/**").hasAnyAuthority("ADMIN", "EVENTS")
			.requestMatchers(HttpMethod.DELETE, "/tickettypes/**").hasAnyAuthority("ADMIN", "EVENTS")
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
	
	@Bean
	CorsConfigurationSource corsConfigurationSource()
	{
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","PATCH"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.addExposedHeader("*");
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}