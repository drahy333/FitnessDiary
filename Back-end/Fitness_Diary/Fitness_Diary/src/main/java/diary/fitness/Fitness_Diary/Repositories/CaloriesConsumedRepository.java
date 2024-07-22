package diary.fitness.Fitness_Diary.Repositories;

import diary.fitness.Fitness_Diary.Entities.CaloriesConsumed;
import diary.fitness.Fitness_Diary.Entities.LoginToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CaloriesConsumedRepository extends JpaRepository<CaloriesConsumed, Long> {
    Optional<CaloriesConsumed> findByUserId(Long userId);
}

