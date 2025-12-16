package ma.ensias.sireleve.repository;

import ma.ensias.sireleve.model.Releve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReleveRepository extends JpaRepository<Releve, Long> {

    List<Releve> findByCompteurIdCompteur(Long idCompteur);

    List<Releve> findByAgentIdAgent(Long idAgent);

    List<Releve> findByDateReleveBetween(LocalDate start, LocalDate end);
}