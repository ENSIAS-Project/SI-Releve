package ma.ensias.sireleve.repository;

import ma.ensias.sireleve.model.Adresse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdresseRepository extends JpaRepository<Adresse, Long> {

    List<Adresse> findByQuartierIdQuartier(Long idQuartier);
}