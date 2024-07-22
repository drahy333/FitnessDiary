package diary.fitness.Fitness_Diary.Services;

import diary.fitness.Fitness_Diary.Entities.User;
import diary.fitness.Fitness_Diary.Entities.UserLogin;
import diary.fitness.Fitness_Diary.Repositories.UserLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserLoginService {

    @Autowired
    private UserLoginRepository userLoginRepository;
    @Autowired
    private UserService userService;

    // Method to retrieve token by user ID
    public String getTokenByUserId(Long userId) {
        return userLoginRepository.findByUserId(userId).get().getToken();
    }

    // Method to update or create a token for a user
    public void updateOrCreateToken(Long userId, String newToken) {

        Optional<UserLogin> userLoginOptional = userLoginRepository.findByUserId(userId);
        User u = userService.getUserById(userId);
        if (userLoginOptional.isPresent()) {
            UserLogin userLogin = userLoginOptional.get();
            userLogin.setToken(newToken);
            userLoginRepository.save(userLogin);
        } else {
            userLoginRepository.save(new UserLogin(newToken, u));
        }
    }
}

