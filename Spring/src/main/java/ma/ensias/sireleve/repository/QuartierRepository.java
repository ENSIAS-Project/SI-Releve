package ma.ensias.sireleve.repository;

import ma.ensias.sireleve.model.Quartier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuartierRepository extends JpaRepository<Quartier, Long> {
}