package diary.fitness.Fitness_Diary.Services;


import diary.fitness.Fitness_Diary.Entities.Food;
import diary.fitness.Fitness_Diary.Repositories.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public Food getFoodById(Long foodId) {
        return foodRepository.getById(foodId);
    }
}
