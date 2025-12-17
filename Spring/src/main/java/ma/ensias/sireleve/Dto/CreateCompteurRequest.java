package ma.ensias.sireleve.Dto;

import lombok.Data;
import ma.ensias.sireleve.enumz.CompteurType;

@Data
public class CreateCompteurRequest {
    Long id_client;
    String adresse;
    CompteurType type_compteur;
}
