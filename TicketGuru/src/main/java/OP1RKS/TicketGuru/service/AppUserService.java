package OP1RKS.TicketGuru.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import OP1RKS.TicketGuru.domain.AppUser;
import OP1RKS.TicketGuru.domain.AppUserRepository;
import OP1RKS.TicketGuru.dto.AppUserDTO;

@Service
public class AppUserService {
    @Autowired
    private AppUserRepository urepo;

    public AppUserDTO getUserById(Long id) {
        AppUser user = urepo.findById(id).orElse(null);
        AppUserDTO userDTO = new AppUserDTO();
        userDTO.setId(user.getAppUser_id());
        userDTO.setEmail(user.getEmail());
        userDTO.setUserrole(user.getRole());
        
        return userDTO;
    }
    
    public List<AppUserDTO> getAllAppUsers() {
    	urepo.findAll();
    	// for each id pick email, userrole
    	// to list
    }
}