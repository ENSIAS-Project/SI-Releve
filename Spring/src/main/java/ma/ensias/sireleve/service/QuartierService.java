package ma.ensias.sireleve.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import ma.ensias.sireleve.Dto.QuartierResponseDto;
import ma.ensias.sireleve.model.Quartier;
import ma.ensias.sireleve.repository.QuartierRepository;

@Service
@AllArgsConstructor
public class QuartierService {

    QuartierRepository quartierRepository;

    @Transactional()
    public Page<QuartierResponseDto> getAllReleves(Pageable pageable) {
         Page<Quartier> quartiers = quartierRepository.findAll(pageable);
        return quartiers.map(quartier -> QuartierResponseDto.
            builder().
            idQuartier(quartier.getIdQuartier()).
            nomQuartier(quartier.getNomQuartier())
            .build()
        );
    }

    @Transactional()
    public List<QuartierResponseDto> getAllQuartiers() {
        return quartierRepository.findAll().stream()
        .map(quartier -> QuartierResponseDto.
            builder().
            idQuartier(quartier.getIdQuartier()).
            nomQuartier(quartier.getNomQuartier())
            .build())
            .toList();
    }
    
}
