package diary.fitness.Fitness_Diary.Services;

import diary.fitness.Fitness_Diary.Entities.Exercise;
import diary.fitness.Fitness_Diary.Entities.User;
import diary.fitness.Fitness_Diary.Repositories.ExerciseRepository;
import diary.fitness.Fitness_Diary.Repositories.SetsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;
    @Autowired
    private SetsRepository setsRepository;

    public List<Exercise> getExercisesByUser(User user) {
        return exerciseRepository.findByUser(user);
    }
    public Exercise getExerciseById(Long id){
        return exerciseRepository.findById(id).get();
    }
    @Transactional
    public void deleteExercise(Long exerciseId) {
        setsRepository.deleteAllByExerciseId(exerciseId);
        exerciseRepository.deleteById(exerciseId);
    }
    public List<Exercise> getExercisesByUserAndDate(User user, LocalDate date) {
        // Implementation to fetch exercises by user and specific date
        return exerciseRepository.findByUserAndDate(user, date);
    }


    public Exercise saveExercise(Exercise exercise) {
        return exerciseRepository.save(exercise);
    }
}
