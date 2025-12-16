package ma.ensias.sireleve.service;

import lombok.AllArgsConstructor;
import ma.ensias.sireleve.Dto.UserCreateDto;
import ma.ensias.sireleve.Dto.UserResponseDto;
import ma.ensias.sireleve.Dto.UserUpdateDto;
import ma.ensias.sireleve.model.Utilisateur;
import ma.ensias.sireleve.repository.UtilisateurRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class UserService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponseDto addUser(UserCreateDto userDto) {
        Utilisateur user = new Utilisateur();
        user.setNom(userDto.getNom());
        user.setPrenom(userDto.getPrenom());
        user.setEmail(userDto.getEmail());
        user.setMotDePasse(passwordEncoder.encode(userDto.getMotDePasse()));
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
}
