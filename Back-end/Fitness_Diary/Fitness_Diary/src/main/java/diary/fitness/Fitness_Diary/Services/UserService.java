package diary.fitness.Fitness_Diary.Services;

import diary.fitness.Fitness_Diary.Security.JwtUtil;
import diary.fitness.Fitness_Diary.Entities.User;
import diary.fitness.Fitness_Diary.Entities.UserLogin;
import diary.fitness.Fitness_Diary.Repositories.UserRepository;
import diary.fitness.Fitness_Diary.Repositories.UserLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserLoginRepository userLoginRepository;
    @Autowired
    private JwtUtil jwtUtil;

    public User findUserByToken(String token) {
        Optional<UserLogin> userLoginOpt = userLoginRepository.findByToken(token);
        if (userLoginOpt.isPresent()) {
            return userLoginOpt.get().getUser();
        }
        return null;  // Return null or throw a custom exception if user is not found
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);  // Assuming this method exists
    }

    public User registerNewUser(String email, String password, String gender, Double weight, Integer height, Integer age) {
        User user = new User(email, password, gender, weight, height, age);
        return userRepository.save(user);
    }


    public Long getUserIdFromToken(String authorizationHeader) {
        String token = authorizationHeader.substring("Bearer ".length());
        User user = findUserByToken(token);
        if (user != null) {
            return user.getId();
        }
        throw new IllegalArgumentException("Invalid token");  // Throw an exception if user is not found
    }

    public User getUserFromToken(String authorizationHeader) {
        String token = authorizationHeader.substring("Bearer ".length());
        User user = findUserByToken(token);
        if (user != null) {
            return user;
        }
        throw new IllegalArgumentException("Invalid token");  // Throw an exception if user is not found
    }

    public void deleteUserLoginByToken(String token) {
        Long userId = getUserIdFromToken(token);

        userLoginRepository.findByUserId(userId).ifPresent(userLogin -> userLoginRepository.delete(userLogin));
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).get();
    }
    public User updateUserInfo(User user, Map<String, Object> updates) {
        if (user != null) {
            updates.forEach((key, value) -> {
                switch (key) {
                    case "weight":
                        user.setWeight(Double.parseDouble(value.toString()));
                        break;
                    case "height":
                        user.setHeight(Integer.parseInt(value.toString()));
                        break;
                    case "age":
                        user.setAge(Integer.parseInt(value.toString()));
                        break;
                    default:
                        // handle unknown key if necessary
                        break;
                }
            });
            userRepository.save(user);
            return user;
        }
        return null;  // User not found
    }
}

