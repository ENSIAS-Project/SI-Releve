package ma.ensias.sireleve.Dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ClientGetReplyDto {
    Long id_client;
    String label_client;
}
