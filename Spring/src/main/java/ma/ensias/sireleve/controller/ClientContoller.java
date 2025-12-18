package ma.ensias.sireleve.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import ma.ensias.sireleve.Dto.ClientGetReplyDto;
import ma.ensias.sireleve.model.Client;
import ma.ensias.sireleve.service.ClientService;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class ClientContoller {

  ClientService clientService;

  @GetMapping("/clients")
  public ResponseEntity<?> getClients(
    @RequestParam(required = false) Integer page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(defaultValue = "nom,asc") String sort) {
    if (page == null) {
      return ResponseEntity.ok(
        clientService.getClients()
          .stream()
          .map(this::mapToResponseDto)
          .toList()
      );
    }

    String[] sortParams = sort.split(",");
    Sort.Direction direction = sortParams.length > 1 && sortParams[1].equalsIgnoreCase("desc")
      ? Sort.Direction.DESC
      : Sort.Direction.ASC;

    Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));

    Page<ClientGetReplyDto> clients = clientService.getClientsPageable(pageable)
        .map(this::mapToResponseDto);

    return ResponseEntity.ok(clients);
  }

  private ClientGetReplyDto mapToResponseDto(Client client) {
    return ClientGetReplyDto.builder()
      .id_client(client.getIdClient())
      .label_client(client.getNomClient() + " " + client.getPrenomClient())
      .build();
  }

}
