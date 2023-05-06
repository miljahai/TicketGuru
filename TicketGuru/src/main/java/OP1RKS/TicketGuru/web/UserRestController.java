package OP1RKS.TicketGuru.web;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import OP1RKS.TicketGuru.domain.AppUser;
import OP1RKS.TicketGuru.domain.AppUserRepository;
import OP1RKS.TicketGuru.domain.UserDTO;
import OP1RKS.TicketGuru.domain.UserRole;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@CrossOrigin(origins = {"http://localhost:8080","https://cen-cenru4.azurewebsites.net", "https://miljahai.github.io"}, maxAge = 3600)
@RestController
public class UserRestController {

	@Autowired
	private AppUserRepository urepo;

    /*@Autowired
    private PasswordEncoder passwordEncoder;*/
	
	// REST AppUser
	// REST List all AppUsers
    @PreAuthorize("hasAuthority('ADMIN')")
	@GetMapping("/users")
	public Iterable<AppUser> getAppUsers() {
		return urepo.findAll();
	};
	
	// REST List all Roles
	@PreAuthorize("hasAuthority('ADMIN')")
	@GetMapping("/roles")
    public ResponseEntity<List<String>> getAllRoles() {
        List<String> roles = Arrays.stream(UserRole.values())
                                    .map(Enum::name)
                                    .collect(Collectors.toList());
        return ResponseEntity.ok(roles);
    }
	
	// REST Update
	@PutMapping("/users/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public UserDTO editAppUser(@Valid @RequestBody UserDTO editUserDto, @PathVariable Long id, BindingResult result) throws MethodArgumentNotValidException {
	    Optional<AppUser> appUser = urepo.findById(id);
	    if (appUser.isPresent()) {
	        if (result.hasErrors()) {
	            throw new MethodArgumentNotValidException(null, result);
	        }
	        AppUser existingAppUser = appUser.get();

	        // set user properties from the DTO
	        existingAppUser.setFirstname(editUserDto.getFirstname());
	        existingAppUser.setLastname(editUserDto.getLastname());
	        existingAppUser.setEmail(editUserDto.getEmail());
	        existingAppUser.setUserrole(editUserDto.getUserrole());

	        // save the updated user
	        existingAppUser = urepo.save(existingAppUser);

	        // create a new UserDTO from the updated user
	        UserDTO updatedUserDto = new UserDTO(existingAppUser);
	        return updatedUserDto;
	    } else {
	        throw new EntityNotFoundException("User not found with id: " + id);
	    }
	};
	
	// REST Find by id
	@GetMapping("/users/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public AppUser editAppUser(@PathVariable Long id) {
		Optional<AppUser> appUser = urepo.findById(id);
		if (appUser.isPresent()) {
			return appUser.get();
		} else {
			throw new EntityNotFoundException("User not found with id " + id);
		}
	};
	
	// REST Delete
	@DeleteMapping("/users/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public void deleteAppUser(@PathVariable Long id) {
		if (!urepo.existsById(id)) {
			throw new EntityNotFoundException("User not found with id " + id);
		}
		urepo.deleteById(id);
	};
	
}
