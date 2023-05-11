package OP1RKS.TicketGuru.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	
	/*
	 * The methods in this service validate JWT payload and compare it to AppUser table in the database.
	 * A valid token is returned to caller.
	 * When a new token is created, current time is set as the time of creation. The token expires in 1000*60*60*24 milliseconds = 24 hours.
	 */
	
	
	// SECRET KEY used by the tokens
	// Following link can be used to create a new key
	// 		https://allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
	// 		Hex = true
	// 		Key must be at least 256-bits
	private static final String SECRET_KEY = "244326462948404D635166546A576E5A7234753778214125442A472D4B614E64";
	
	// Extract the username from the token
	public String extractUsername(String token) {
	    return extractClaim(token, Claims::getSubject);
	  }
	
	// Extract all claims from the token
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
	    final Claims claims = extractAllClaims(token);
	    return claimsResolver.apply(claims);
	    }
	
	// Fetch user details to create the token
	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("authorities", userDetails.getAuthorities()
                .stream()
                .map(auth -> auth.getAuthority())
                .collect(Collectors.toList()));
	    return generateToken(claims, userDetails);
	    }
	
	// Create the token
	// Note! To change the token expiration time, edit the .setExpiration row
	public String generateToken(
	      Map<String, Object> extraClaims,
	      UserDetails userDetails
	  ) {
	    return Jwts
	        .builder()
	        .setClaims(extraClaims)
	        .setSubject(userDetails.getUsername())
	        .setIssuedAt(new Date(System.currentTimeMillis()))
	        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
	        .signWith(getSignInKey(), SignatureAlgorithm.HS256)
	        .compact();
	  }
	
	// Validate the token by checking if username is found in the email field of AppUser table
	// Validate the token by checking if expiration has not passed
	public boolean isTokenValid(String token, UserDetails userDetails) {
		    final String username = extractUsername(token);
		    return (userDetails != null && username.equals(userDetails.getUsername())) && !isTokenExpired(token);
		  }
	
	// Extract expiration date from the token
	private boolean isTokenExpired(String token) {
		    return extractExpiration(token).before(new Date());
		  }
	
	// Extract expiration claim from the token
	private Date extractExpiration(String token) {
		    return extractClaim(token, Claims::getExpiration);
		  }
	
	// Parse the JWT
	private Claims extractAllClaims(String token) {
		    return Jwts
		        .parserBuilder()
		        .setSigningKey(getSignInKey())
		        .build()
		        .parseClaimsJws(token)
		        .getBody();
		  }

	// Get the SECRET KEY to decode the JWT
	private Key getSignInKey() {
		    byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
		    return Keys.hmacShaKeyFor(keyBytes);
		  }

}