package ma.ensias.sireleve.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.ensias.sireleve.enumz.Roles;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    
    private Long idUser;
    private String nom;
    private String prenom;
    private String email;
    private Roles roles;
    private LocalDateTime dateCreation;
    private LocalDateTime dateModification;
}
