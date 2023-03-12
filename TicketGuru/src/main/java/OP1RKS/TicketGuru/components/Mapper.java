package OP1RKS.TicketGuru.components;

import java.util.List;

import org.springframework.stereotype.Component;

import OP1RKS.TicketGuru.domain.AppUser;
import OP1RKS.TicketGuru.domain.UserRole;
import OP1RKS.TicketGuru.dto.AppUserCreationDTO;
import OP1RKS.TicketGuru.dto.AppUserDTO;

@Component
public class Mapper {
	public AppUserDTO toDto(AppUser user) {
		String email = user.getEmail();
		UserRole userrole = user.getRole();
		
		return new AppUserDTO(email, userrole);
	}
	
	public AppUser toUser(AppUserCreationDTO userDTO) {
		return new AppUser(userDTO.getEmail(), userDTO.getPassword(), userDTO.getUserrole());
	}
}
