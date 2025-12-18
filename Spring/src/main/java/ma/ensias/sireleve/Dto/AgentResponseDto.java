package ma.ensias.sireleve.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgentResponseDto {
    private Long idAgent;
    private String nom;
    private String prenom;
    private String telProfessionnel;
    private String nomQuartier;
}
