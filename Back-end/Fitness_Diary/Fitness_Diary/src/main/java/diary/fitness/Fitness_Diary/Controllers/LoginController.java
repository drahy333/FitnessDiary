package diary.fitness.Fitness_Diary.Controllers;

import diary.fitness.Fitness_Diary.Security.JwtUtil;
import diary.fitness.Fitness_Diary.Security.LoginRequest;
import diary.fitness.Fitness_Diary.Entities.User;
import diary.fitness.Fitness_Diary.Repositories.UserRepository; // Import UserRepository
import diary.fitness.Fitness_Diary.Services.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
public class LoginController {

    @Autowired
    private UserRepository userRepository; // Autowire UserRepository
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserLoginService userLoginService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (loginRequest.getPassword().equals(user.getPassword())) {
                // Authentication successful, generate JWT
                String token = jwtUtil.generateToken(user);
                Map<String, String> tokenResponse = new HashMap<>();
                tokenResponse.put("token", token);
                userLoginService.updateOrCreateToken(user.getId(),token);
                return ResponseEntity.ok(tokenResponse); // Returns HTTP 200 with the JWT token wrapped in a JSON object
            } else {
                // Invalid password
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", "Invalid credentials"));
            }
        } else {
            // User not found
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", "User not found"));
        }
    }

}
