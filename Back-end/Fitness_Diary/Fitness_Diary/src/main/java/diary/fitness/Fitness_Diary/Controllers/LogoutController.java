package diary.fitness.Fitness_Diary.Controllers;

import diary.fitness.Fitness_Diary.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LogoutController {

    @Autowired
    private UserService userService;

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader(value = "Authorization") String token) {
        if (token != null && token.startsWith("Bearer ")) {
            userService.deleteUserLoginByToken(token);
            return ResponseEntity.ok().body("User logged out successfully");
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }
}
