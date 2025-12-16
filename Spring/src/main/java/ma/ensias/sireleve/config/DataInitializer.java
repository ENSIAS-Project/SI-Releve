package ma.ensias.sireleve.config;

import lombok.AllArgsConstructor;
import ma.ensias.sireleve.enumz.Roles;
import ma.ensias.sireleve.model.Utilisateur;
import ma.ensias.sireleve.repository.UtilisateurRepository;
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
    }
}
