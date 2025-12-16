package ma.ensias.sireleve.repository;

import ma.ensias.sireleve.model.Agent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgentRepository extends JpaRepository<Agent, Long> {

    List<Agent> findByQuartierIdQuartier(Long idQuartier);
}