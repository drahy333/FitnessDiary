package diary.fitness.Fitness_Diary.Repositories;

import diary.fitness.Fitness_Diary.Entities.Cardio;
import diary.fitness.Fitness_Diary.Entities.Exercise;
import diary.fitness.Fitness_Diary.Entities.Set;
import diary.fitness.Fitness_Diary.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CardioRepository extends JpaRepository<Cardio, Long> {
    List<Cardio> findByUserAndDate(User user, LocalDate date);
}
