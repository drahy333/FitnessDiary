package diary.fitness.Fitness_Diary.Services;

import diary.fitness.Fitness_Diary.Entities.Cardio;
import diary.fitness.Fitness_Diary.Entities.Note;
import diary.fitness.Fitness_Diary.Entities.Set;
import diary.fitness.Fitness_Diary.Repositories.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public Note saveNote(Note note) {
        return noteRepository.save(note);
    }

    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }

    public List<Note> getNotesByCardio(Cardio cardio) {
        return noteRepository.findByCardio(cardio);
    }

    // Add other service methods as needed
}
