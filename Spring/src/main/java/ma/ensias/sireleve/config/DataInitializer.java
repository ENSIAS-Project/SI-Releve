package ma.ensias.sireleve.config;

import lombok.AllArgsConstructor;
import ma.ensias.sireleve.enumz.CompteurType;
import ma.ensias.sireleve.enumz.Roles;
import ma.ensias.sireleve.model.*;
import ma.ensias.sireleve.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UtilisateurRepository utilisateurRepository;
    private final QuartierRepository quartierRepository;
    private final ClientRepository clientRepository;
    private final AdresseRepository adresseRepository;
    private final CompteurRepository compteurRepository;
    private final AgentRepository agentRepository;
    private final ReleveRepository releveRepository;
    private final PasswordEncoder passwordEncoder;

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
        // Quartiers
        List<Quartier> quartiers = new ArrayList<>();
        String[] nomsQuartiers = {"Centre Ville", "Agdal", "Hay Riad", "Océan", "Souissi", 
                                   "Hassan", "Aviation", "Akkari", "Yacoub El Mansour", "Guich Oudaya"};
        for (String nom : nomsQuartiers) {
            Quartier quartier = new Quartier();
            quartier.setNomQuartier(nom);
            quartiers.add(quartier);
        }
        quartierRepository.saveAll(quartiers);

        // Clients
        List<Client> clients = new ArrayList<>();
        String[][] clientsData = {
            {"Alami", "Hassan"}, {"Benani", "Fatima"}, {"Chraibi", "Ahmed"},
            {"Drissi", "Laila"}, {"El Fassi", "Omar"}, {"Ghali", "Nadia"},
            {"Hamidi", "Rachid"}, {"Idrissi", "Sanaa"}, {"Jilali", "Karim"},
            {"Kettani", "Samira"}
        };
        for (String[] data : clientsData) {
            Client client = new Client();
            client.setNomClient(data[0]);
            client.setPrenomClient(data[1]);
            clients.add(client);
        }
        clientRepository.saveAll(clients);

        // Adresses
        List<Adresse> adresses = new ArrayList<>();
        String[] rues = {"15 Rue Mohammed V", "27 Avenue Hassan II", "42 Boulevard Zerktouni",
                        "8 Rue Taha Hussein", "63 Avenue des FAR", "19 Rue Ibn Batouta",
                        "34 Avenue Al Massira", "51 Rue Oued Fes", "12 Boulevard Anfa",
                        "76 Rue Al Jazira"};
        for (int i = 0; i < 10; i++) {
            Adresse adresse = new Adresse();
            adresse.setAdresseComplete(rues[i]);
            adresse.setQuartier(quartiers.get(i));
            adresses.add(adresse);
        }
        adresseRepository.saveAll(adresses);

        // Compteurs
        List<Compteur> compteurs = new ArrayList<>();
        CompteurType[] types = {CompteurType.EAU, CompteurType.ELECTRICITE};
        for (int i = 0; i < 10; i++) {
            Compteur compteur = new Compteur();
            compteur.setTypeCompteur(types[i % 2]);
            compteur.setClient(clients.get(i));
            compteur.setAdresse(adresses.get(i));
            compteurs.add(compteur);
        }
        compteurRepository.saveAll(compteurs);

        // Agents
        List<Agent> agents = new ArrayList<>();
        String[][] agentsData = {
            {"Amrani", "Youssef", "0612345678"}, {"Berrada", "Imane", "0623456789"},
            {"Chakir", "Mehdi", "0634567890"}, {"Daoud", "Sofia", "0645678901"},
            {"Elidrissi", "Amine", "0656789012"}, {"Filali", "Hind", "0667890123"},
            {"Guerraoui", "Tarik", "0678901234"}, {"Houda", "Zineb", "0689012345"},
            {"Jaidi", "Samir", "0690123456"}, {"Kabbaj", "Leila", "0601234567"}
        };
        for (int i = 0; i < 10; i++) {
            Agent agent = new Agent();
            agent.setNom(agentsData[i][0]);
            agent.setPrenom(agentsData[i][1]);
            agent.setTelProfessionnel(agentsData[i][2]);
            agent.setQuartier(quartiers.get(i));
            agents.add(agent);
        }
        agentRepository.saveAll(agents);

        // Relevés
        List<Releve> releves = new ArrayList<>();
        LocalDate baseDate = LocalDate.of(2025, 11, 1);
        
        for (int i = 0; i < 12; i++) {
            Releve releve = new Releve();
            releve.setDateReleve(baseDate.plusDays(i * 5));
            releve.setIndex(1000 + (i * 50) + (i % 3 * 10));
            releve.setCompteur(compteurs.get(i % 10));
            releve.setAgent(agents.get(i % 10));
            releves.add(releve);
        }
        releveRepository.saveAll(releves);

        System.out.println("Initialisation terminée avec succès!");
        System.out.println(utilisateurRepository.count() + " utilisateurs créés");
        System.out.println(quartierRepository.count() + " quartiers créés");
        System.out.println(clientRepository.count() + " clients créés");
        System.out.println(adresseRepository.count() + " adresses créées");
        System.out.println(compteurRepository.count() + " compteurs créés");
        System.out.println(agentRepository.count() + " agents créés");
        System.out.println(releveRepository.count() + " relevés créés");
    }
}
