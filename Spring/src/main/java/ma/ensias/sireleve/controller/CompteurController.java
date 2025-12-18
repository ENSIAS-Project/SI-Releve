package ma.ensias.sireleve.controller;

import lombok.AllArgsConstructor;
import ma.ensias.sireleve.Dto.CompteurResponse;
import ma.ensias.sireleve.Dto.CreateCompteurRequest;
import ma.ensias.sireleve.model.Compteur;
import ma.ensias.sireleve.service.CompteurService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class CompteurController {

    CompteurService compteurService;

    @GetMapping("/compteurs")
    @PreAuthorize("hasRole('UTILISATEUR')")
    public ResponseEntity<?> getCompteurs(
            @RequestParam(required = false) Integer page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "idCompteur,asc") String sort) {

        if (page == null) {
            List<CompteurResponse> list = compteurService.getCompteurs()
                    .stream()
                    .map(this::mapToResponseDto)
                    .toList();
            return ResponseEntity.ok(list);
        }

        String[] sortParams = sort.split(",");
        Sort.Direction direction = sortParams.length > 1 && sortParams[1].equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));

        Page<CompteurResponse> pageResp = compteurService.getCompteursPageable(pageable)
                .map(this::mapToResponseDto);

        return ResponseEntity.ok(pageResp);
    }

    @PostMapping("/compteurs")
    @PreAuthorize("hasRole('UTILISATEUR')")
    public ResponseEntity<?> createCompteur(@RequestBody CreateCompteurRequest request) {
        Compteur created = compteurService.createCompteur(request);
        return ResponseEntity.ok(mapToResponseDto(created));
    }

    @DeleteMapping("/compteurs/{id_compteur}")
    @PreAuthorize("hasRole('UTILISATEUR')")
    public ResponseEntity<?> deleteCompteur(@PathVariable("id_compteur") Long idCompteur) {
        try {
            compteurService.deleteCompteur(idCompteur);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    private CompteurResponse mapToResponseDto(Compteur c) {
        String labelClient = c.getClient() != null ? c.getClient().getNomClient() + " " + c.getClient().getPrenomClient() : null;
        String adresse = c.getAdresse() != null ? c.getAdresse().getAdresseComplete() : null;
        return CompteurResponse.builder()
                .id_compteur(c.getIdCompteur())
                .label_client(labelClient)
                .adresse(adresse)
                .type_compteur(c.getTypeCompteur())
                .build();
    }

}
