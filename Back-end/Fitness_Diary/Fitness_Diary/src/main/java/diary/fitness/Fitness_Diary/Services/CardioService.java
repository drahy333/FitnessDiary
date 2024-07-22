package diary.fitness.Fitness_Diary.Services;

import diary.fitness.Fitness_Diary.Entities.Cardio;
import diary.fitness.Fitness_Diary.Entities.User;
import diary.fitness.Fitness_Diary.Repositories.CardioRepository;
import diary.fitness.Fitness_Diary.Repositories.NoteRepository;
import diary.fitness.Fitness_Diary.Repositories.SetsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CardioService {

    @Autowired
    private CardioRepository cardioRepository;
    @Autowired
    private NoteRepository noteRepository;

    public List<Cardio> getAllCardio() {
        return cardioRepository.findAll();
    }

    public Cardio saveCardio(Cardio cardio) {
        return cardioRepository.save(cardio);
    }

    public void deleteCardio(Long id) {
        cardioRepository.deleteById(id);
        noteRepository.deleteAllByCardioId(id);
    }

    public List<Cardio> getExercisesByUserAndDate(User user, LocalDate date) {
        return cardioRepository.findByUserAndDate(user, date);
    }

    public Optional<Cardio> getCardioById(Long cardioId) {
        return cardioRepository.findById(cardioId);
    }

    public Cardio saveCardio(Map<String, Object> cardioData, LocalDate date, User user) {
        String exerciseItem = cardioData.get("name").toString();
        String durationString = cardioData.get("duration").toString();
        int caloriesBurned = Integer.parseInt(cardioData.get("caloriesBurned").toString());

        Cardio cardio = new Cardio(durationString, caloriesBurned, date, exerciseItem, user);
        cardioRepository.save(cardio);
        return cardio;
    }


    // Add other service methods as needed
}
