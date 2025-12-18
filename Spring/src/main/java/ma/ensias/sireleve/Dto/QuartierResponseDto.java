package ma.ensias.sireleve.Dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuartierResponseDto {

    private Long idQuartier;
    private String nomQuartier;
}
