package diary.fitness.Fitness_Diary.Repositories;

import diary.fitness.Fitness_Diary.Entities.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface SleepRepository extends JpaRepository<Sleep, Long> {
    // Additional custom query methods can be defined here if needed
    List<Sleep> findByUserAndDate(User user, LocalDate date);

}
