package diary.fitness.Fitness_Diary.Repositories;


import diary.fitness.Fitness_Diary.Entities.Exercise;
import diary.fitness.Fitness_Diary.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findByUser(User user);
    Optional<Exercise> findById(Long id);
    // Additional custom methods can be defined here

    List<Exercise> findByUserAndDate(User user, LocalDate date);

}

