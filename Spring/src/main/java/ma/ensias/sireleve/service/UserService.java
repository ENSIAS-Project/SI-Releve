package ma.ensias.sireleve.service;

import lombok.AllArgsConstructor;
import ma.ensias.sireleve.Dto.UserCreateDto;
import ma.ensias.sireleve.Dto.UserResponseDto;
import ma.ensias.sireleve.Dto.UserUpdateDto;
import ma.ensias.sireleve.model.Utilisateur;
import ma.ensias.sireleve.repository.UtilisateurRepository;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@AllArgsConstructor
public class UserService {

    private static final String CHARSET ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!-_";
    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;


    @Transactional
    public UserResponseDto addUser(UserCreateDto userDto) {
        Utilisateur user = new Utilisateur();
        user.setNom(userDto.getNom());
        user.setPrenom(userDto.getPrenom());
        user.setEmail(userDto.getEmail());
        String password;
        try {
            password = generate();
            mailService.sendWelcomeMail(user.getEmail(),user.getNom(),password);
        } catch (Exception e) {
            password = "TempPass@123";  //HACK : yes i am aware that this is not the best design choice
            e.printStackTrace();
        }
        user.setMotDePasse(passwordEncoder.encode(password));
        user.setRoles(userDto.getRoles());
        
        Utilisateur savedUser = utilisateurRepository.save(user);
        return mapToResponseDto(savedUser);
    }

    @Transactional
    public UserResponseDto updateUser(UserUpdateDto userDto) {
        Utilisateur user = utilisateurRepository.findById(userDto.getIdUser())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userDto.getIdUser()));

        user.setNom(userDto.getNom());
        user.setPrenom(userDto.getPrenom());
        user.setEmail(userDto.getEmail());
        user.setRoles(userDto.getRoles());

        Utilisateur updatedUser = utilisateurRepository.save(user);
        return mapToResponseDto(updatedUser);
    }

    @Transactional
    public void deleteUser(Long userId) {
        if (!utilisateurRepository.existsById(userId)) {
            throw new RuntimeException("User not found with id: " + userId);
        }
        utilisateurRepository.deleteById(userId);
    }

    public Page<UserResponseDto> getAllUsers(Pageable pageable) {
        Page<Utilisateur> usersPage = utilisateurRepository.findAll(pageable);
        return usersPage.map(this::mapToResponseDto);
    }

    private UserResponseDto mapToResponseDto(Utilisateur user) {
        return UserResponseDto.builder()
                .idUser(user.getIdUser())
                .nom(user.getNom())
                .prenom(user.getPrenom())
                .email(user.getEmail())
                .roles(user.getRoles())
                .dateCreation(user.getDateCreation())
                .dateModification(user.getDateModification())
                .build();
    }

     public static String generate() throws NoSuchAlgorithmException {
            long time = Instant.now().getEpochSecond();
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(String.valueOf(time).getBytes());
            int length = 8 + (hash[0] & 0x03); 
            StringBuilder password = new StringBuilder();
            for (int i = 0; i < length; i++) {
                int index = Byte.toUnsignedInt(hash[i]) % CHARSET.length();
                password.append(CHARSET.charAt(index));
            }
            return password.toString();
    }
}
