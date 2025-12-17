package ma.ensias.sireleve.config;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.ensias.sireleve.enumz.Roles;
import ma.ensias.sireleve.model.Utilisateur;
import ma.ensias.sireleve.repository.UtilisateurRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

@Component
@AllArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        log.info("╔════════════════════════════════════════════════════════════╗");
        log.info("║       DEMARRAGE DE L'INITIALISATION DES DONNEES           ║");
        log.info("╚════════════════════════════════════════════════════════════╝");
        
        initializeUsers();
    }

    private void initializeUsers() {
        log.info("🔄 Vérification des utilisateurs dans la base de données...");

        long userCount = utilisateurRepository.count();
        log.info("📊 Nombre d'utilisateurs existants: {}", userCount);

        if (userCount > 0) {
            log.info("✅ Des utilisateurs existent déjà. Aucune initialisation nécessaire.");
            displayExistingUsers();
            return;
        }

        log.info("📝 Aucun utilisateur trouvé. Création des utilisateurs par défaut...\n");

        // ===== SUPER ADMINS =====
        log.info("👑 Création des Super Admins...");
        
        createUser("Admin", "Super", "admin@ensias.ma", "Admin@2024", Roles.ROLE_SUPERADMIN);
        createUser("Tazi", "Karim", "karim.tazi@ensias.ma", "Admin@2024", Roles.ROLE_SUPERADMIN);

        // ===== UTILISATEURS =====
        log.info("\n👤 Création des Utilisateurs...");

        createUser("Alami", "Ahmed", "ahmed.alami@ensias.ma", "User@2024", Roles.ROLE_UTILISATEUR);
        createUser("Bennani", "Fatima", "fatima.bennani@ensias.ma", "User@2024", Roles.ROLE_UTILISATEUR);
        createUser("El Amrani", "Youssef", "youssef.elamrani@ensias.ma", "User@2024", Roles.ROLE_UTILISATEUR);
        createUser("Chaoui", "Salma", "salma.chaoui@ensias.ma", "User@2024", Roles.ROLE_UTILISATEUR);
        createUser("Idrissi", "Mohammed", "mohammed.idrissi@ensias.ma", "User@2024", Roles.ROLE_UTILISATEUR);
        createUser("Ziani", "Amina", "amina.ziani@ensias.ma", "User@2024", Roles.ROLE_UTILISATEUR);

        // Afficher le résumé
        displaySummary();
        displayCredentials();
    }

    private void createUser(String nom, String prenom, String email, String password, Roles role) {
        try {
            // Vérifier si l'utilisateur existe déjà
            Optional<Utilisateur> existingUser = utilisateurRepository.findByEmail(email);
            if (existingUser.isPresent()) {
                log.warn("⚠️  L'utilisateur {} {} existe déjà", prenom, nom);
                return;
            }

            Utilisateur utilisateur = new Utilisateur();
            utilisateur.setNom(nom);
            utilisateur.setPrenom(prenom);
            utilisateur.setEmail(email);
            utilisateur.setMotDePasse(passwordEncoder.encode(password));
            utilisateur.setRoles(role);
            utilisateur.setDateCreation(LocalDateTime.now());
            utilisateur.setDateModification(LocalDateTime.now());

            utilisateurRepository.save(utilisateur);
            
            String roleIcon = role == Roles.ROLE_SUPERADMIN ? "👑" : "👤";
            log.info("   ✅ {} {} {} - {} ({})", roleIcon, prenom, nom, email, role.getString());
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la création de l'utilisateur {} {}: {}", 
                prenom, nom, e.getMessage());
        }
    }

    private void displayExistingUsers() {
        try {
            var users = utilisateurRepository.findAll();
            log.info("\n📋 Liste des utilisateurs existants:");
            log.info("────────────────────────────────────────────────────────────");
            
            users.forEach(user -> {
                String roleIcon = user.getRoles() == Roles.ROLE_SUPERADMIN ? "👑" : "👤";
                log.info("   {} {} {} - {} ({})", 
                    roleIcon, 
                    user.getPrenom(), 
                    user.getNom(), 
                    user.getEmail(),
                    user.getRoles().getString());
            });
            
            log.info("────────────────────────────────────────────────────────────");
        } catch (Exception e) {
            log.error("❌ Erreur lors de l'affichage des utilisateurs: {}", e.getMessage());
        }
    }

    private void displaySummary() {
        long totalUsers = utilisateurRepository.count();
        log.info("\n╔════════════════════════════════════════════════════════════╗");
        log.info("║              ✅ INITIALISATION TERMINÉE                    ║");
        log.info("╠════════════════════════════════════════════════════════════╣");
        log.info("║  📊 Total utilisateurs créés: {}                            ║", totalUsers);
        log.info("║  👑 Super Admins: 2                                        ║");
        log.info("║  👤 Utilisateurs: {}                                        ║", totalUsers - 2);
        log.info("╚════════════════════════════════════════════════════════════╝");
    }

    private void displayCredentials() {
        log.info("\n╔════════════════════════════════════════════════════════════╗");
        log.info("║            🔐 IDENTIFIANTS DE CONNEXION                    ║");
        log.info("╠════════════════════════════════════════════════════════════╣");
        log.info("║                                                            ║");
        log.info("║  👑 SUPER ADMIN PRINCIPAL                                  ║");
        log.info("║     Email: admin@ensias.ma                                 ║");
        log.info("║     Mot de passe: Admin@2024                               ║");
        log.info("║                                                            ║");
        log.info("║  👑 SUPER ADMIN SECONDAIRE                                 ║");
        log.info("║     Email: karim.tazi@ensias.ma                            ║");
        log.info("║     Mot de passe: Admin@2024                               ║");
        log.info("║                                                            ║");
        log.info("║  👤 UTILISATEUR EXEMPLE                                    ║");
        log.info("║     Email: ahmed.alami@ensias.ma                           ║");
        log.info("║     Mot de passe: User@2024                                ║");
        log.info("║                                                            ║");
        log.info("╚════════════════════════════════════════════════════════════╝");
        log.info("\n🚀 L'application est prête à être utilisée !");
        log.info("📍 Accédez à l'interface de login pour vous connecter.\n");
    }
}