package ma.ensias.sireleve.Dto;

import lombok.Builder;
import lombok.Data;
import ma.ensias.sireleve.enumz.Roles;

@Data
@Builder
public class LoginReplyDto {
    private String token;
    private Roles role;
}
