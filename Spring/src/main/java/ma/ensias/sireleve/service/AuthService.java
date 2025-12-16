package ma.ensias.sireleve.service;

import java.util.Optional;

import javax.security.auth.login.CredentialNotFoundException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import ma.ensias.sireleve.Dto.LoginReplyDto;
import ma.ensias.sireleve.Dto.LoginRequestDto;
import ma.ensias.sireleve.config.JWTUtils;
import ma.ensias.sireleve.model.Utilisateur;
import ma.ensias.sireleve.repository.UtilisateurRepository;

@Service
@AllArgsConstructor
public class AuthService {

    UtilisateurRepository utilisateurRepository;
    PasswordEncoder passwordEncoder;
    JWTUtils jwtUtils;

    public LoginReplyDto authenticate(LoginRequestDto login) throws CredentialNotFoundException {
        Optional<Utilisateur> user = utilisateurRepository.findByEmail(login.getEmail());
        if (!user.isPresent()) {
            throw new CredentialNotFoundException();
        }
        if (!passwordEncoder.matches(login.getPassword(), user.get().getMotDePasse()))
            throw new CredentialNotFoundException();
        Utilisateur u = user.get();
        System.out.println(" Utilisateur authentifié: " + u.getEmail());
        String token = jwtUtils.generateToken(
                u.getIdUser(),
                u.getNom(),
                u.getEmail(),
                u.getRoles());
        return LoginReplyDto.builder()
                .token(token)
                .role(u.getRoles())
                .build();

    }

}
