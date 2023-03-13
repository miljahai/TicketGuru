package OP1RKS.TicketGuru.web;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import OP1RKS.TicketGuru.components.Mapper;
import OP1RKS.TicketGuru.domain.AppUser;
import OP1RKS.TicketGuru.domain.AppUserRepository;
import OP1RKS.TicketGuru.domain.UserRoleRepository;
import OP1RKS.TicketGuru.dto.AppUserCreationDTO;
import OP1RKS.TicketGuru.dto.AppUserDTO;
import OP1RKS.TicketGuru.dto.AppUserIdDTO;
import OP1RKS.TicketGuru.service.AppUserService;

@RestController
@RequestMapping("/users")
public class AppUserController {

	private AppUserRepository urepo;
	private AppUserService uservice;
	private UserRoleRepository rrepo;
	private Mapper mapper;
	
	@GetMapping
	@ResponseBody
	public List<AppUserDTO> getUsers() {
		return uservice.getAllAppUsers()	// needs to be defined in uservice
				.stream()
				.map(mapper::toDto)
				.collect(toList());
	}
	
	@PostMapping
	@ResponseBody
	public AppUserDTO create(@RequestBody AppUserCreationDTO userDTO) {
		AppUser user = mapper.toUser(userDTO);
		
		userDTO.getUserrole();
		
		urepo.save(user);
		
		return new AppUserDTO(user.getAppUser_id());
	}
}
