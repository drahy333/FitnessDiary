package diary.fitness.Fitness_Diary.Services;

import diary.fitness.Fitness_Diary.Entities.UserNutrition;
import diary.fitness.Fitness_Diary.Repositories.UserNutritionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserNutritionService {

    @Autowired
    private UserNutritionRepository userNutritionRepository;

    public UserNutrition saveUserNutrition(UserNutrition userNutrition) {
        return userNutritionRepository.save(userNutrition);
    }

    public Optional<UserNutrition> getUserNutritionById(Long id) {
        return userNutritionRepository.findById(id);
    }

    public List<UserNutrition> getAllUserNutritions() {
        return userNutritionRepository.findAll();
    }
    @Transactional
    public void deleteUserNutrition(Long id) {
        userNutritionRepository.deleteById(id);
    }

    public List<UserNutrition> getUserNutritionByUserIdAndDate(Long userId, LocalDate date) {
        return userNutritionRepository.findByUserIdAndDate(userId, date);
    }
}
