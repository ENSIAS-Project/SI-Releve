package ma.ensias.sireleve.controller;

import lombok.AllArgsConstructor;
import ma.ensias.sireleve.Dto.LoginReplyDto;
import ma.ensias.sireleve.Dto.LoginRequestDto;
import ma.ensias.sireleve.Dto.UserCreateDto;
import ma.ensias.sireleve.Dto.UserResponseDto;
import ma.ensias.sireleve.Dto.UserUpdateDto;
import ma.ensias.sireleve.service.AuthService;
import ma.ensias.sireleve.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.CredentialNotFoundException;

@RestController
@RequestMapping("/api/v1/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginReplyDto> login(@RequestBody LoginRequestDto loginRequest) {
        try {
            LoginReplyDto response = authService.authenticate(loginRequest);
            return ResponseEntity.ok(response);
        } catch (CredentialNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('SUPERADMIN')")
    public ResponseEntity<UserResponseDto> addUser(@RequestBody UserCreateDto userDto) {
        UserResponseDto createdUser = userService.addUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('SUPERADMIN')")
    public ResponseEntity<UserResponseDto> updateUser(@RequestBody UserUpdateDto userDto) {
        UserResponseDto updatedUser = userService.updateUser(userDto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SUPERADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @PreAuthorize("hasRole('SUPERADMIN')")
    public ResponseEntity<Page<UserResponseDto>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "nom,asc") String sort) {
        
        String[] sortParams = sort.split(",");
        Sort.Direction direction = sortParams.length > 1 && sortParams[1].equalsIgnoreCase("desc") 
                ? Sort.Direction.DESC 
                : Sort.Direction.ASC;
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));
        Page<UserResponseDto> users = userService.getAllUsers(pageable);
        
        return ResponseEntity.ok(users);
    }
}
