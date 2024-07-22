package diary.fitness.Fitness_Diary.Services;

import diary.fitness.Fitness_Diary.Entities.CaloriesConsumed;
import diary.fitness.Fitness_Diary.Repositories.CaloriesConsumedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class CaloriesConsumedService {

    @Autowired
    CaloriesConsumedRepository caloriesConsumedRepository;
    public Optional<CaloriesConsumed> getCaloriesConsumedByUserId(Long userId) {
        return caloriesConsumedRepository.findByUserId(userId);
    }
}
