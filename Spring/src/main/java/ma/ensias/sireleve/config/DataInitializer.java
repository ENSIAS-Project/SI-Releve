package ma.ensias.sireleve.config;

import lombok.AllArgsConstructor;
import ma.ensias.sireleve.enumz.CompteurType;
import ma.ensias.sireleve.enumz.Roles;
import ma.ensias.sireleve.model.Utilisateur;
import ma.ensias.sireleve.model.Client;
import ma.ensias.sireleve.model.Compteur;
import ma.ensias.sireleve.model.Adresse;
import ma.ensias.sireleve.model.Quartier;
import ma.ensias.sireleve.repository.UtilisateurRepository;
import ma.ensias.sireleve.repository.ClientRepository;
import ma.ensias.sireleve.repository.CompteurRepository;
import ma.ensias.sireleve.repository.AdresseRepository;
import ma.ensias.sireleve.repository.QuartierRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final ClientRepository clientRepository;
    private final QuartierRepository quartierRepository;
    private final AdresseRepository adresseRepository;
    private final CompteurRepository compteurRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (utilisateurRepository.count() > 0) {
            System.out.println("La base de données contient déjà des données");
            return;
        }

        System.out.println("Initialisation de la base de données");

        List<Utilisateur> utilisateurs = new ArrayList<>();

        // Création d'un utilisateur SUPERADMIN
        Utilisateur superAdmin = new Utilisateur();
        superAdmin.setNom("Admin");
        superAdmin.setPrenom("Super");
        superAdmin.setEmail("admin@sireleve.ma");
        superAdmin.setMotDePasse(passwordEncoder.encode("Admin@123"));
        superAdmin.setRoles(Roles.ROLE_SUPERADMIN);
        utilisateurs.add(superAdmin);

        // Création d'utilisateurs réguliers
        Utilisateur user1 = new Utilisateur();
        user1.setNom("Yousfi");
        user1.setPrenom("Wiame");
        user1.setEmail("wiame.yousfi@sireleve.ma");
        user1.setMotDePasse(passwordEncoder.encode("Wiame@123"));
        user1.setRoles(Roles.ROLE_UTILISATEUR);
        utilisateurs.add(user1);

        Utilisateur user2 = new Utilisateur();
        user2.setNom("Bennani");
        user2.setPrenom("Fatima");
        user2.setEmail("fatima.bennani@sireleve.ma");
        user2.setMotDePasse(passwordEncoder.encode("Fatima@123"));
        user2.setRoles(Roles.ROLE_UTILISATEUR);
        utilisateurs.add(user2);

        Utilisateur user3 = new Utilisateur();
        user3.setNom("El Annasi");
        user3.setPrenom("Nada");
        user3.setEmail("nada.elannasi@sireleve.ma");
        user3.setMotDePasse(passwordEncoder.encode("Nada@123"));
        user3.setRoles(Roles.ROLE_UTILISATEUR);
        utilisateurs.add(user3);

        Utilisateur user4 = new Utilisateur();
        user4.setNom("Yousfi");
        user4.setPrenom("Omar");
        user4.setEmail("omar.yousfi@sireleve.ma");
        user4.setMotDePasse(passwordEncoder.encode("Omar@123"));
        user4.setRoles(Roles.ROLE_UTILISATEUR);
        utilisateurs.add(user4);

        Utilisateur user5 = new Utilisateur();
        user5.setNom("Tazi");
        user5.setPrenom("Mohamed");
        user5.setEmail("mohamed.tazi@sireleve.ma");
        user5.setMotDePasse(passwordEncoder.encode("Mohamed@123"));
        user5.setRoles(Roles.ROLE_UTILISATEUR);
        utilisateurs.add(user5);

        Utilisateur user6 = new Utilisateur();
        user6.setNom("Fassi");
        user6.setPrenom("Salma");
        user6.setEmail("salma.fassi@sireleve.ma");
        user6.setMotDePasse(passwordEncoder.encode("Salma@123"));
        user6.setRoles(Roles.ROLE_UTILISATEUR);
        utilisateurs.add(user6);

        Utilisateur user7 = new Utilisateur();
        user7.setNom("Bouazza");
        user7.setPrenom("Karim");
        user7.setEmail("karim.bouazza@sireleve.ma");
        user7.setMotDePasse(passwordEncoder.encode("Karim@123"));
        user7.setRoles(Roles.ROLE_UTILISATEUR);
        utilisateurs.add(user7);

        Utilisateur user8 = new Utilisateur();
        user8.setNom("Lahlou");
        user8.setPrenom("Nadia");
        user8.setEmail("nadia.lahlou@sireleve.ma");
        user8.setMotDePasse(passwordEncoder.encode("Nadia@123"));
        user8.setRoles(Roles.ROLE_UTILISATEUR);
        utilisateurs.add(user8);

        // Persister tous les utilisateurs en une seule transaction
        utilisateurRepository.saveAll(utilisateurs);
        System.out.println("Initialisation terminée avec succès!");
        System.out.println(utilisateurRepository.count() + " utilisateurs créés:");

        // --- Ajout de clients factices ---
        List<Client> clients = new ArrayList<>();

        Client c1 = new Client();
        c1.setNomClient("Ben");
        c1.setPrenomClient("Hassan");
        clients.add(c1);

        Client c2 = new Client();
        c2.setNomClient("El");
        c2.setPrenomClient("Amina");
        clients.add(c2);

        Client c3 = new Client();
        c3.setNomClient("Khalid");
        c3.setPrenomClient("Karim");
        clients.add(c3);

        Client c4 = new Client();
        c4.setNomClient("Rachid");
        c4.setPrenomClient("Salma");
        clients.add(c4);

        Client c5 = new Client();
        c5.setNomClient("Nouri");
        c5.setPrenomClient("Lina");
        clients.add(c5);

        clientRepository.saveAll(clients);
        System.out.println(clientRepository.count() + " clients créés.");
        
        // --- Ajout de quartiers et adresses factices ---
        Quartier q1 = new Quartier();
        q1.setNomQuartier("Centre-ville");

        Quartier q2 = new Quartier();
        q2.setNomQuartier("Hay Riadh");

        quartierRepository.save(q1);
        quartierRepository.save(q2);

        Adresse a1 = new Adresse();
        a1.setAdresseComplete("12 Rue des Orangers, Casablanca");
        a1.setQuartier(q1);

        Adresse a2 = new Adresse();
        a2.setAdresseComplete("45 Boulevard Hassan II, Rabat");
        a2.setQuartier(q2);

        Adresse a3 = new Adresse();
        a3.setAdresseComplete("7 Avenue Mohammed V, Marrakech");
        a3.setQuartier(q1);

        adresseRepository.save(a1);
        adresseRepository.save(a2);
        adresseRepository.save(a3);

        // --- Ajout de compteurs factices associés aux clients et adresses ---
        List<Compteur> compteurs = new ArrayList<>();

        Compteur comp1 = new Compteur();
        comp1.setTypeCompteur(CompteurType
        .EAU);
        comp1.setClient(clients.get(0));
        comp1.setAdresse(a1);
        compteurs.add(comp1);

        Compteur comp2 = new Compteur();
        comp2.setTypeCompteur(CompteurType.ELECTRICITE);
        comp2.setClient(clients.get(1));
        comp2.setAdresse(a2);
        compteurs.add(comp2);

        Compteur comp3 = new Compteur();
        comp3.setTypeCompteur(CompteurType.EAU);
        comp3.setClient(clients.get(2));
        comp3.setAdresse(a3);
        compteurs.add(comp3);

        Compteur comp4 = new Compteur();
        comp4.setTypeCompteur(CompteurType.ELECTRICITE);
        comp4.setClient(clients.get(3));
        comp4.setAdresse(a1);
        compteurs.add(comp4);

        compteurRepository.saveAll(compteurs);
        System.out.println(compteurRepository.count() + " compteurs créés.");
    }
}
