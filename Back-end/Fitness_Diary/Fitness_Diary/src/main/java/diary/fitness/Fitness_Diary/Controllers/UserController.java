package diary.fitness.Fitness_Diary.Controllers;

import diary.fitness.Fitness_Diary.Entities.User;
import diary.fitness.Fitness_Diary.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }
    @GetMapping("/getUser")
    public ResponseEntity<Map<String, Object>> getUser(@RequestHeader(value = "Authorization") String authorizationHeader) {
        User user = userService.getUserFromToken(authorizationHeader);
        HashMap<String,Object> userMap = new HashMap<>();
        userMap.put("weight",user.getWeight());
        userMap.put("height",user.getHeight());
        userMap.put("age",user.getAge());
        userMap.put("gender",user.getGender());
        return ResponseEntity.ok(userMap);
    }
    @PostMapping("/updateUserInfo")
    public ResponseEntity<?> updateUserInfo(@RequestHeader(value = "Authorization") String authorizationHeader, @RequestBody Map<String, Object> updates){
        try {
            User user = userService.getUserFromToken(authorizationHeader);
            User updatedUser = userService.updateUserInfo(user, updates);
            if (updatedUser != null) {
                return ResponseEntity.ok("User information updated successfully.");
            } else {
                return ResponseEntity.badRequest().body("User not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating user information: " + e.getMessage());
        }
    }


}

