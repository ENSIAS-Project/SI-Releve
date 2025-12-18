package ma.ensias.sireleve.service;

import lombok.AllArgsConstructor;
import ma.ensias.sireleve.Dto.CreateCompteurRequest;
import ma.ensias.sireleve.model.Adresse;
import ma.ensias.sireleve.model.Client;
import ma.ensias.sireleve.model.Compteur;
import ma.ensias.sireleve.repository.AdresseRepository;
import ma.ensias.sireleve.repository.ClientRepository;
import ma.ensias.sireleve.repository.CompteurRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@AllArgsConstructor
public class CompteurService {

    CompteurRepository compteurRepository;
    ClientRepository clientRepository;
    AdresseRepository adresseRepository;

    public Collection<Compteur> getCompteurs() {
        return compteurRepository.findAll();
    }

    public Page<Compteur> getCompteursPageable(Pageable pageable) {
        return compteurRepository.findAll(pageable);
    }

    public Compteur createCompteur(CreateCompteurRequest request) {
        Client client = clientRepository.findById(request.getId_client())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Adresse adresse = adresseRepository.findByAdresseComplete(request.getAdresse())
                .orElseGet(() -> {
                    Adresse a = new Adresse();
                    a.setAdresseComplete(request.getAdresse());
                    return adresseRepository.save(a);
                });

        Compteur compteur = new Compteur();
        compteur.setClient(client);
        compteur.setAdresse(adresse);
        compteur.setTypeCompteur(request.getType_compteur());

        return compteurRepository.save(compteur);
    }

    public void deleteCompteur(Long idCompteur) {
        if (!compteurRepository.existsById(idCompteur)) {
            throw new RuntimeException("Compteur not found");
        }
        compteurRepository.deleteById(idCompteur);
    }
}
