package diary.fitness.Fitness_Diary.Repositories;

import diary.fitness.Fitness_Diary.Entities.UserNutrition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface UserNutritionRepository extends JpaRepository<UserNutrition, Long> {
    // You can add custom database queries here if needed
    List<UserNutrition> findByUserIdAndDate(Long userId, LocalDate date);

}
