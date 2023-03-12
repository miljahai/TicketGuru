package OP1RKS.TicketGuru.dto;

import OP1RKS.TicketGuru.domain.UserRole;

public class AppUserCreationDTO {
	
	private String email;
	private String password;
	private UserRole userrole;
	
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public UserRole getUserrole() {
		return userrole;
	}
	public void setUserrole(UserRole userrole) {
		this.userrole = userrole;
	}
	
	
	

	
	
	
	
	
}
