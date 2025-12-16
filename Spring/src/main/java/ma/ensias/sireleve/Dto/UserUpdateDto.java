package ma.ensias.sireleve.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.ensias.sireleve.enumz.Roles;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDto {
    
    private Long idUser;
    private String nom;
    private String prenom;
    private String email;
    private Roles roles;
}
