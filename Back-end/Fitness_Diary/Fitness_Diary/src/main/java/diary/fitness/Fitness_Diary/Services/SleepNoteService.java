package diary.fitness.Fitness_Diary.Services;

import diary.fitness.Fitness_Diary.Entities.Cardio;
import diary.fitness.Fitness_Diary.Entities.Sleep;
import diary.fitness.Fitness_Diary.Entities.SleepNote;
import diary.fitness.Fitness_Diary.Entities.Set;
import diary.fitness.Fitness_Diary.Repositories.NoteRepository;
import diary.fitness.Fitness_Diary.Repositories.SleepNoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SleepNoteService {

    @Autowired
    private SleepNoteRepository sleepNoteRepository;

    public List<SleepNote> getAllNotes() {
        return sleepNoteRepository.findAll();
    }

    public SleepNote saveNote(SleepNote note) {
        return sleepNoteRepository.save(note);
    }

    public void deleteNote(Long id) {
        sleepNoteRepository.deleteById(id);
    }

    public List<SleepNote> getNotesBySleep(Sleep sleep) {
        return sleepNoteRepository.findBySleep(sleep);
    }

    // Add other service methods as needed
}
