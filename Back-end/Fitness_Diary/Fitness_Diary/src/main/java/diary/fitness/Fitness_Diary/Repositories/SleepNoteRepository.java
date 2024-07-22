package diary.fitness.Fitness_Diary.Repositories;

import diary.fitness.Fitness_Diary.Entities.Cardio;
import diary.fitness.Fitness_Diary.Entities.Note;
import diary.fitness.Fitness_Diary.Entities.Sleep;
import diary.fitness.Fitness_Diary.Entities.SleepNote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SleepNoteRepository extends JpaRepository<SleepNote, Long> {
    // Additional custom query methods can be defined here if needed
    List<SleepNote> findBySleep(Sleep sleep);

    void deleteAllBySleepId(Long id);
}
