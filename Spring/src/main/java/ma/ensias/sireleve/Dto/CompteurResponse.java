package ma.ensias.sireleve.Dto;

import lombok.Builder;
import lombok.Data;
import ma.ensias.sireleve.enumz.CompteurType;

@Builder
@Data
public class CompteurResponse {
    Long id_compteur;
    String label_client;
    String adresse;
    CompteurType type_compteur;
}
