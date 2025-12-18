package ma.ensias.sireleve.service;

import java.util.Collection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import ma.ensias.sireleve.model.Client;
import ma.ensias.sireleve.repository.ClientRepository;

@Service
@AllArgsConstructor
public class ClientService {

    ClientRepository clientRepository;

    public Collection<Client> getClients() {
       return clientRepository.findAll();
    }

        public Page<Client> getClientsPageable(Pageable pageable) {
        Page<Client> clientsPage = clientRepository.findAll(pageable);
        return clientsPage;
    }

}
