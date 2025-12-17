package ma.ensias.sireleve.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReleveResponseDto {
    private String labelClient;
    private String typeCompteur;
    private String adresse;
    private Double consommation;
    private LocalDate dateReleve;
}
