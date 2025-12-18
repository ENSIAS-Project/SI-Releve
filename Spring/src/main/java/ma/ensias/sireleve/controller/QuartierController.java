package ma.ensias.sireleve.controller;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import ma.ensias.sireleve.Dto.QuartierResponseDto;
import ma.ensias.sireleve.service.QuartierService;

@RestController
@RequestMapping("/api/v1/quartiers")
@AllArgsConstructor 
public class QuartierController {

    private final QuartierService quartierService;

    @GetMapping
    @PreAuthorize("hasRole('UTILISATEUR')")
    public ResponseEntity<?> getAllReleves(
        @RequestParam(required = false) Integer page,
        @RequestParam(defaultValue = "10") int size
    ) {

        if (page == null) {
            return ResponseEntity.ok(quartierService.getAllQuartiers());
        }
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "nomQuartier"));
        Page<QuartierResponseDto> releves = quartierService.getAllReleves(pageable);
        return ResponseEntity.ok(releves);
    }
    
}
