package diary.fitness.Fitness_Diary.Repositories;

import diary.fitness.Fitness_Diary.Entities.Exercise;
import diary.fitness.Fitness_Diary.Entities.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SetsRepository extends JpaRepository<Set, Long> {
    // Custom database queries can be defined here
    List<Set> findByExercise(Exercise exercise);
    void deleteAllByExerciseId(Long exerciseId);
}
