package diary.fitness.Fitness_Diary.Services;


import diary.fitness.Fitness_Diary.Entities.Set;
import diary.fitness.Fitness_Diary.Entities.Exercise;
import diary.fitness.Fitness_Diary.Repositories.SetsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SetService {

    @Autowired
    private SetsRepository setsRepository;

    public List<Set> getSetsByExercise(Exercise exercise) {
        return setsRepository.findByExercise(exercise);
    }
    public void deleteSet(Long setId) {
        setsRepository.deleteById(setId);
    }
}

