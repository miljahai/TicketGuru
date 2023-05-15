package OP1RKS.TicketGuru.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import OP1RKS.TicketGuru.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private final JwtService jwtService;
	private final UserDetailsService userDetailsService;
	
	
	@Override
	protected void doFilterInternal(
		@NonNull HttpServletRequest request, 
		@NonNull HttpServletResponse response, 
		@NonNull FilterChain filterChain
	) throws ServletException, IOException {
		final String authHeader = request.getHeader("Authorization");
		final String jwt;
		final String userEmail;
		
		// Check if the auth header is present
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}
		// Extract the JWT token from the auth header
		jwt = authHeader.substring(7);
		// Extract the user email from the JWT token
		userEmail = jwtService.extractUsername(jwt);
		// If the user email is present and there is no authentication in the current security context
		if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail); 
			// If the JWT token is valid for the user, set the authentication in the security context
			if(jwtService.isTokenValid(jwt, userDetails)) {
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
						userDetails,
						null,
						userDetails.getAuthorities()
						);
			// Set the authentication token details
			authToken.setDetails(
					new WebAuthenticationDetailsSource().buildDetails(request)
					);
			// Set the authentication token in the security context
			SecurityContextHolder.getContext().setAuthentication(authToken);
						
			}
		}
		filterChain.doFilter(request, response); 
	}


	
}
