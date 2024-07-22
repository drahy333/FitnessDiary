package diary.fitness.Fitness_Diary.Controllers;

import diary.fitness.Fitness_Diary.Entities.*;
import diary.fitness.Fitness_Diary.Repositories.CardioRepository;
import diary.fitness.Fitness_Diary.Services.CardioService;
import diary.fitness.Fitness_Diary.Services.NoteService;
import diary.fitness.Fitness_Diary.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CardioController {

    @Autowired
    private CardioService cardioService;
    @Autowired
    private UserService userService;
    @Autowired
    private CardioRepository cardioRepository;
    @Autowired
    private NoteService noteService;


    @PostMapping("/addCardio")
    public ResponseEntity<Cardio> createCardio(@RequestHeader(value="Authorization") String authorizationHeader,
                                               @RequestBody Map<String, Object> cardioData,
                                               @RequestParam(value = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        User user = userService.getUserFromToken(authorizationHeader);
        Cardio cardio = cardioService.saveCardio(cardioData, date, user);
        return ResponseEntity.ok(cardio);
    }



    @GetMapping("/cardio")
    public ResponseEntity<List<Map<String, Object>>> getAllCardios(
            @RequestHeader(value = "Authorization") String authorizationHeader,
            @RequestParam(value = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        User user = userService.getUserFromToken(authorizationHeader);
        List<Cardio> cardios;

        cardios = cardioService.getExercisesByUserAndDate(user, date);


        List<Map<String, Object>> exerciseList = new ArrayList<>();
        for (Cardio cardio : cardios) {
            Map<String, Object> exerciseMap = new HashMap<>();
            exerciseMap.put("id", cardio.getId());
            exerciseMap.put("name", cardio.getName());
            exerciseMap.put("caloriesBurned", cardio.getCaloriesBurned());
            exerciseMap.put("duration", cardio.getDuration());
            exerciseMap.put("date",cardio.getDate());

            List<Note> notes = noteService.getNotesByCardio(cardio);
            List<Map<String, Object>> notesList = new ArrayList<>();
            for (Note note : notes) {
                Map<String, Object> setMap = new HashMap<>();
                setMap.put("id", note.getId());
                setMap.put("note", note.getText());
                notesList.add(setMap);
            }

            exerciseMap.put("notes", notesList);
            exerciseList.add(exerciseMap);
        }
        return ResponseEntity.ok(exerciseList);
    }
    @PostMapping("/addNote")
    public ResponseEntity<Map<String, Object>> createNote(@RequestHeader(value="Authorization") String authorizationHeader, @RequestBody Map<String, Object> noteData) {
        User user = userService.getUserFromToken(authorizationHeader);
        String text = noteData.get("note").toString();
        Long cardioId = Long.parseLong(noteData.get("cardioExerciseId").toString());
        Cardio cardio = cardioService.getCardioById(cardioId).get();

        Note note = new Note(cardio,text);
        note = noteService.saveNote(note);  // Save and receive the persisted object

        // Create a response map containing only the necessary details
        Map<String, Object> response = new HashMap<>();
        response.put("id", note.getId());
        response.put("note", note.getText());

        return ResponseEntity.ok(response);  // Return the map
    }

    @DeleteMapping("/deleteCardioExercise/{cardioExerciseId}")
    public ResponseEntity<?> deleteCardioExercise(@PathVariable Long cardioExerciseId) {
        try {
            cardioService.deleteCardio(cardioExerciseId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cardio not found");
        }
    }
    @DeleteMapping("/deleteNote/{noteId}")
    public ResponseEntity<?> deleteSet(@PathVariable Long noteId) {
        try {
            noteService.deleteNote(noteId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Note not found");
        }
    }
}
