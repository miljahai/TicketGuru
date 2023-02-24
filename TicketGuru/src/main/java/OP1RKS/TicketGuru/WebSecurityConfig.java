package OP1RKS.TicketGuru;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;



@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

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
            new AntPathRequestMatcher("/login*"),
            new AntPathRequestMatcher("/h2-console"),
            new AntPathRequestMatcher("/h2-console/**")
    };

	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		http.headers().frameOptions().sameOrigin().and();
		
		http.authorizeHttpRequests()
        .requestMatchers(WHITE_LIST_URLS)
        .permitAll();
		http.csrf().disable();
		
		return http.build();
    }
    
    @Bean 
    public PasswordEncoder passwordEncoder() { 
        return new BCryptPasswordEncoder(); 
    }
}