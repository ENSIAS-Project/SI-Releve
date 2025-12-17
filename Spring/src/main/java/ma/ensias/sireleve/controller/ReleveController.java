package ma.ensias.sireleve.controller;

import lombok.AllArgsConstructor;
import ma.ensias.sireleve.Dto.ReleveResponseDto;
import ma.ensias.sireleve.service.ReleveService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/releves")
@AllArgsConstructor
public class ReleveController {

    private final ReleveService releveService;

    @GetMapping
    @PreAuthorize("hasRole('UTILISATEUR')")
    public ResponseEntity<Page<ReleveResponseDto>> getAllReleves(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "dateReleve"));
        Page<ReleveResponseDto> releves = releveService.getAllReleves(pageable);
        return ResponseEntity.ok(releves);
    }
}
