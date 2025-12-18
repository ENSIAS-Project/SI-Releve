package ma.ensias.sireleve.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.ensias.sireleve.enumz.CompteurType;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReleveResponseDto {
    private String labelClient;
    private CompteurType typeCompteur;
    private String adresse;
    private Double consommation;
    private LocalDate dateReleve;
}
