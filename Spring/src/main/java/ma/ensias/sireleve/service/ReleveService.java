package ma.ensias.sireleve.service;

import lombok.AllArgsConstructor;
import ma.ensias.sireleve.Dto.ReleveResponseDto;
import ma.ensias.sireleve.model.Releve;
import ma.ensias.sireleve.repository.ReleveRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class ReleveService {

    private final ReleveRepository releveRepository;

    @Transactional(readOnly = true)
    public Page<ReleveResponseDto> getAllReleves(Pageable pageable) {
        Page<Releve> releves = releveRepository.findAll(pageable);
        
        return releves.map(releve -> {
            String labelClient = releve.getCompteur().getClient().getNomClient() + " " +
                               releve.getCompteur().getClient().getPrenomClient();
            
            Double consommation = calculateConsommation(releve);
            
            return new ReleveResponseDto(
                labelClient,
                releve.getCompteur().getTypeCompteur(),
                releve.getCompteur().getAdresse().getAdresseComplete(),
                consommation,
                releve.getDateReleve()
            );
        });
    }

    private Double calculateConsommation(Releve releve) {
        Releve previousReleve = releveRepository
            .findTopByCompteurAndDateReleveLessThanOrderByDateReleveDesc(
                releve.getCompteur(), 
                releve.getDateReleve()
            )
            .orElse(null);
        
        if (previousReleve != null) {
            return (double) (releve.getIndex() - previousReleve.getIndex());
        }
        
        return (double) releve.getIndex();
    }
}
