package OP1RKS.TicketGuru.dto;

import OP1RKS.TicketGuru.domain.UserRole;

public class AppUserDTO {
	
	private Long id;
	private String email;
	private UserRole userrole;
	
		
	public AppUserDTO() { }

	public AppUserDTO(Long id) { 
		this.id = id;
	}
	
	public AppUserDTO(String email, UserRole userrole) {
		this.email = email;
		this.userrole = userrole;
	}
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public UserRole getUserrole() {
		return userrole;
	}
	public void setUserrole(UserRole userrole) {
		this.userrole = userrole;
	}
	
	
	

	
}
