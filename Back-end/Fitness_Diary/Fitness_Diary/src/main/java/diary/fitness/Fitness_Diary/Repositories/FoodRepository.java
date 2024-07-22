package diary.fitness.Fitness_Diary.Repositories;
import diary.fitness.Fitness_Diary.Entities.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    Optional<Food> findByFoodItem(String foodItem);
    // Custom database operations aren't affected by Jakarta EE
}

