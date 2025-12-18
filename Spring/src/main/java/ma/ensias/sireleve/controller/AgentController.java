package ma.ensias.sireleve.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import ma.ensias.sireleve.Dto.AffectationRequestDto;
import ma.ensias.sireleve.Dto.AgentResponseDto;
import ma.ensias.sireleve.service.AgentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/agents")
@AllArgsConstructor
public class AgentController {

    private final AgentService agentService;

    @GetMapping
    @PreAuthorize("hasRole('UTILISATEUR')")
    public ResponseEntity<Page<AgentResponseDto>> getAllAgents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "nom"));
        Page<AgentResponseDto> agents = agentService.getAllAgents(pageable);
        return ResponseEntity.ok(agents);
    }

    @PutMapping("/{idAgent}/quartier")
    @PreAuthorize("hasRole('UTILISATEUR')")
    public ResponseEntity<AgentResponseDto> affectAgentToQuartier(
            @PathVariable Long idAgent,
            @Valid @RequestBody AffectationRequestDto affectationRequest
    ) {
        AgentResponseDto agent = agentService.affectAgentToQuartier(idAgent, affectationRequest.getIdQuartier());
        return ResponseEntity.ok(agent);
    }
}
