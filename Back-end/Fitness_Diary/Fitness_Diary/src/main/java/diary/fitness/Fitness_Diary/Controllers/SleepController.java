package diary.fitness.Fitness_Diary.Controllers;

import diary.fitness.Fitness_Diary.Entities.*;
import diary.fitness.Fitness_Diary.Repositories.CardioRepository;
import diary.fitness.Fitness_Diary.Repositories.SleepRepository;
import diary.fitness.Fitness_Diary.Services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.format.DateTimeFormatter;

@RestController
public class SleepController {

    @Autowired
    private SleepService sleepService;
    @Autowired
    private UserService userService;
    @Autowired
    private SleepRepository sleepRepository;
    @Autowired
    private SleepNoteService sleepNoteService;


    @PostMapping("/addSleep")
    public ResponseEntity<Map<String, Object>> createSleep(@RequestHeader(value="Authorization") String authorizationHeader,
                                                           @RequestBody Map<String, Object> sleepData,
                                                           @RequestParam(value = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        User user = userService.getUserFromToken(authorizationHeader);
        String sleepStartStr = sleepData.get("sleep_start").toString();
        String sleepStopStr = sleepData.get("sleep_stop").toString();
        int energy = Integer.parseInt(sleepData.get("energy").toString());

        LocalTime sleepStart = LocalTime.parse(sleepStartStr);
        LocalTime sleepStop = LocalTime.parse(sleepStopStr);

        Duration duration = Duration.between(sleepStart, sleepStop);
        if (duration.isNegative()) {
            duration = duration.plusHours(24);  // Correct for durations passing midnight
        }

        // Formatting the duration as 'HH:MM'
        long hours = duration.toHours();
        long minutes = duration.toMinutesPart();
        String formattedDuration = String.format("%02d:%02d", hours, minutes);

        Sleep sleep = new Sleep(sleepStartStr, sleepStopStr, date, user, energy, formattedDuration);
        sleep = sleepRepository.save(sleep);

        Map<String, Object> response = new HashMap<>();
        response.put("id", sleep.getId());
        response.put("sleepStart", sleep.getSleep_start()); // Assuming getters are correctly named as getSleepStart
        response.put("sleepStop", sleep.getSleep_stop());   // Assuming getters are correctly named as getSleepStop
        response.put("energy", sleep.getEnergy());
        response.put("duration", formattedDuration);  // Now sending duration as a string in 'HH:MM' format

        return ResponseEntity.ok(response);  // Return the map with the updated format
    }




    @GetMapping("/sleep")
    public ResponseEntity<List<Map<String, Object>>> getAllSleeps(
            @RequestHeader(value = "Authorization") String authorizationHeader,
            @RequestParam(value = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        User user = userService.getUserFromToken(authorizationHeader);
        List<Sleep> sleeps;

        sleeps = sleepService.getExercisesByUserAndDate(user, date);


        List<Map<String, Object>> sleepList = new ArrayList<>();
        for (Sleep sleep : sleeps) {
            Map<String, Object> sleepMap = new HashMap<>();
            sleepMap.put("id", sleep.getId());
            sleepMap.put("sleepStart", sleep.getSleep_start());
            sleepMap.put("sleepStop", sleep.getSleep_stop());
            sleepMap.put("date",sleep.getDate());
            sleepMap.put("energy",sleep.getEnergy());
            sleepMap.put("duration",sleep.getDuration());

            List<SleepNote> notes = sleepNoteService.getNotesBySleep(sleep);
            List<Map<String, Object>> notesList = new ArrayList<>();
            for (SleepNote note : notes) {
                Map<String, Object> setMap = new HashMap<>();
                setMap.put("id", note.getId());
                setMap.put("note", note.getText());
                notesList.add(setMap);
            }

            sleepMap.put("notes", notesList);
            sleepList.add(sleepMap);
        }
        return ResponseEntity.ok(sleepList);
    }
    @PostMapping("/addSleepNote")
    public ResponseEntity<Map<String, Object>> createNote(@RequestHeader(value="Authorization") String authorizationHeader, @RequestBody Map<String, Object> noteData) {
        User user = userService.getUserFromToken(authorizationHeader);

        String text = noteData.get("note").toString();
        Long sleepId = Long.parseLong(noteData.get("sleepId").toString());
        Sleep sleep = sleepService.getSleepById(sleepId).get();

        SleepNote note = new SleepNote(sleep,text);
        note = sleepNoteService.saveNote(note);  // Save and receive the persisted object

        // Create a response map containing only the necessary details
        Map<String, Object> response = new HashMap<>();
        response.put("id", note.getId());
        response.put("note", note.getText());

        return ResponseEntity.ok(response);  // Return the map
    }

    @DeleteMapping("/deleteSleep/{sleepId}")
    public ResponseEntity<?> deleteCardioExercise(@PathVariable Long sleepId) {
        try {
            sleepService.deleteSleep(sleepId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sleep not found");
        }
    }
    @DeleteMapping("/deleteSleepNote/{sleepNoteId}")
    public ResponseEntity<?> deleteSet(@PathVariable Long sleepNoteId) {
        try {
            sleepNoteService.deleteNote(sleepNoteId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("SleepNote not found");
        }
    }

    public class SleepDTO {
        private LocalDate date;
        private String sleepStart;
        private String sleepStop;
        private int energy;

        // Constructor
        public SleepDTO(LocalDate date, String sleepStart, String sleepStop, int energy) {
            this.date = date;
            this.sleepStart = sleepStart;
            this.sleepStop = sleepStop;
            this.energy = energy;
        }

    }
    }
