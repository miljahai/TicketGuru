package OP1RKS.TicketGuru.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

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
	 * Palvelussa olevat metodit tarkistaa kutsujen JWT:n sisällön ja vertaa sitä kannassa AppUser-taulun tietoihin.
	 * Tokenin ollessa kunnossa se palautetaan palvelua kutsuneelle.
	 * Kun uusi Token luodaan, se saa luontiajaksi kuluvan ajan hetken. Token on voimassa 1000*60*24 millisekunttia = 24 tuntia.
	 */
	
	
	// SALAINEN AVAIN tokeneja varten
	// https://allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
	// Hex = true
	// Avaimen pitää olla vähintään 256-bittinen
	private static final String SECRET_KEY = "244326462948404D635166546A576E5A7234753778214125442A472D4B614E64";
	
	// 
	public String extractUsername(String token) {
	    return extractClaim(token, Claims::getSubject);
	  }
	
	// 
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
	    final Claims claims = extractAllClaims(token);
	    return claimsResolver.apply(claims);
	    }
	
	// Hakee käyttäjän tiedot tokenin luontia varten
	public String generateToken(UserDetails userDetails) {
	    return generateToken(new HashMap<>(), userDetails);
	    }
	
	// Tämä luo tokenin.
	// Huom! Tällä voi säätää tokenin voimassa oloaikaa setExpiration-kohtaa muokkaamalla
	public String generateToken(
	      Map<String, Object> extraClaims,
	      UserDetails userDetails
	  ) {
	    return Jwts
	        .builder()
	        .setClaims(extraClaims)
	        .setSubject(userDetails.getUsername())
	        .setIssuedAt(new Date(System.currentTimeMillis()))
	        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
	        .signWith(getSignInKey(), SignatureAlgorithm.HS256)
	        .compact();
	  }
	
	// Tarkistetaan vastaako tokenissa oleva käyttäjänimi/sähköpostiosoite kannan tietoja.
	// Tarkistetaan, onko Token yhä voimassa.
	public boolean isTokenValid(String token, UserDetails userDetails) {
		    final String username = extractUsername(token);
		    return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
		  }
	
	// Voimassaolon tarkistusta
	private boolean isTokenExpired(String token) {
		    return extractExpiration(token).before(new Date());
		  }
	
	// Voimassaolon tarkistusta	
	private Date extractExpiration(String token) {
		    return extractClaim(token, Claims::getExpiration);
		  }
	
	// Kerää JWT:n tiedot
	private Claims extractAllClaims(String token) {
		    return Jwts
		        .parserBuilder()
		        .setSigningKey(getSignInKey())
		        .build()
		        .parseClaimsJws(token)
		        .getBody();
		  }

	// Hakee salaisen avaimen JWT:n hashausta varten
	private Key getSignInKey() {
		    byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
		    return Keys.hmacShaKeyFor(keyBytes);
		  }

}
