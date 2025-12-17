package ma.ensias.sireleve.service;

import lombok.AllArgsConstructor;
import ma.ensias.sireleve.Dto.QuartierResponseDto;
import ma.ensias.sireleve.model.Quartier;
import ma.ensias.sireleve.repository.QuartierRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class QuartierService {

    private final QuartierRepository quartierRepository;

    @Transactional(readOnly = true)
    public List<QuartierResponseDto> getAllQuartiers() {
        List<Quartier> quartiers = quartierRepository.findAll();
        
        return quartiers.stream()
            .map(quartier -> new QuartierResponseDto(
                quartier.getIdQuartier(),
                quartier.getNomQuartier()
            ))
            .collect(Collectors.toList());
    }
}
