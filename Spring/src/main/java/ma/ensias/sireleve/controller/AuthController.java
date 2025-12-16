package ma.ensias.sireleve.controller;

import javax.security.auth.login.CredentialNotFoundException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import ma.ensias.sireleve.Dto.LoginReplyDto;
import ma.ensias.sireleve.Dto.LoginRequestDto;
import ma.ensias.sireleve.service.AuthService;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {

    AuthService authservice;

    @PostMapping("/login")
    public ResponseEntity<LoginReplyDto> UserLogin(@RequestBody LoginRequestDto login) {
        try{
            LoginReplyDto reply  = authservice.authenticate(login);
            return ResponseEntity.ok().body(reply);
        }catch(CredentialNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }
}