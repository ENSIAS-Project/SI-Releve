package ma.ensias.sireleve.service;

import lombok.AllArgsConstructor;
import ma.ensias.sireleve.Dto.AgentResponseDto;
import ma.ensias.sireleve.model.Agent;
import ma.ensias.sireleve.model.Quartier;
import ma.ensias.sireleve.repository.AgentRepository;
import ma.ensias.sireleve.repository.QuartierRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class AgentService {

    private final AgentRepository agentRepository;
    private final QuartierRepository quartierRepository;

    @Transactional(readOnly = true)
    public Page<AgentResponseDto> getAllAgents(Pageable pageable) {
        Page<Agent> agents = agentRepository.findAll(pageable);
        
        return agents.map(agent -> new AgentResponseDto(
            agent.getIdAgent(),
            agent.getNom(),
            agent.getPrenom(),
            agent.getTelProfessionnel(),
            agent.getQuartier() != null ? agent.getQuartier().getNomQuartier() : null
        ));
    }

    @Transactional
    public AgentResponseDto affectAgentToQuartier(Long idAgent, Long idQuartier) {
        Agent agent = agentRepository.findById(idAgent)
            .orElseThrow(() -> new RuntimeException("Agent non trouvé avec l'ID: " + idAgent));
        
        Quartier quartier = quartierRepository.findById(idQuartier)
            .orElseThrow(() -> new RuntimeException("Quartier non trouvé avec l'ID: " + idQuartier));
        
        agent.setQuartier(quartier);
        Agent updatedAgent = agentRepository.save(agent);
        
        return new AgentResponseDto(
            updatedAgent.getIdAgent(),
            updatedAgent.getNom(),
            updatedAgent.getPrenom(),
            updatedAgent.getTelProfessionnel(),
            updatedAgent.getQuartier().getNomQuartier()
        );
    }
}
