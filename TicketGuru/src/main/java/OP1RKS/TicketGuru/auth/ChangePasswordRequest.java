package OP1RKS.TicketGuru.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordRequest {
	private String email;
	private String currentPassword;
    private String newPassword;
    private String confirmPassword;
}
