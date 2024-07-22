package diary.fitness.Fitness_Diary.Services;

import diary.fitness.Fitness_Diary.Entities.Sleep;
import diary.fitness.Fitness_Diary.Entities.User;
import diary.fitness.Fitness_Diary.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class SleepService {

    @Autowired
    private SleepRepository sleepRepository;
    @Autowired
    private SleepNoteRepository sleepNoteRepository;

    public List<Sleep> getAllSleep() {
        return sleepRepository.findAll();
    }

    public Sleep saveSleep(Sleep sleep) {
        return sleepRepository.save(sleep);
    }

    public void deleteSleep(Long id) {
        sleepRepository.deleteById(id);
        sleepNoteRepository.deleteAllBySleepId(id);
    }

    public List<Sleep> getExercisesByUserAndDate(User user, LocalDate date) {
        return sleepRepository.findByUserAndDate(user, date);
    }

    public Optional<Sleep> getSleepById(Long sleepId) {
        return sleepRepository.findById(sleepId);
    }

    // Add other service methods as needed
}
