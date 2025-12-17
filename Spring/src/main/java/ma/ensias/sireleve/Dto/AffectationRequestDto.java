package ma.ensias.sireleve.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AffectationRequestDto {
    @NotNull(message = "L'ID du quartier est obligatoire")
    private Long idQuartier;
}
