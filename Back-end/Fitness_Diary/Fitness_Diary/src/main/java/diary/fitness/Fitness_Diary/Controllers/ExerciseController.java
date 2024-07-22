package diary.fitness.Fitness_Diary.Controllers;

import diary.fitness.Fitness_Diary.Entities.Exercise;
import diary.fitness.Fitness_Diary.Entities.Set;
import diary.fitness.Fitness_Diary.Entities.User;
import diary.fitness.Fitness_Diary.Repositories.ExerciseRepository;
import diary.fitness.Fitness_Diary.Repositories.SetsRepository;
import diary.fitness.Fitness_Diary.Services.ExerciseService;
import diary.fitness.Fitness_Diary.Services.SetService;
import diary.fitness.Fitness_Diary.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDate;

@RestController
public class ExerciseController {

    @Autowired
    private ExerciseRepository exerciseRepository;
    @Autowired
    private SetsRepository setsRepository;
    @Autowired
    private ExerciseService exerciseService;

    @Autowired
    private SetService setService;

    @Autowired
    private UserService userService;

    public class ExerciseDTO {
        private Long id;
        private String exercise;
        private String bodyPart;
        private String username;  // Assuming you want to include user's name or username

        private LocalDate date;  // Add a LocalDate field

        public ExerciseDTO(Long id, String exercise, String bodyPart, String username, LocalDate date) {
            this.id = id;
            this.exercise = exercise;
            this.bodyPart = bodyPart;
            this.username = username;
            this.date = date;
        }

        // Getters
        public Long getId() {
            return id;
        }

        public String getExercise() {
            return exercise;
        }

        public String getBodyPart() {
            return bodyPart;
        }

        public String getUsername() {
            return username;
        }

        // Setters, if necessary
    }

    // POST: Create a new exercise
    @PostMapping("/training")
    public ResponseEntity<ExerciseDTO> createExercise(@RequestHeader(value = "Authorization") String authorizationHeader,
                                                      @RequestBody Map<String, Object> exerciseData,
                                                      @RequestParam(value = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        User user = userService.getUserFromToken(authorizationHeader);
        String exerciseItem = exerciseData.get("name").toString().toLowerCase();
        String bodyPart = exerciseData.get("bodyPart").toString().toLowerCase();

        Exercise exercise = new Exercise(exerciseItem, bodyPart, user, date);
        Exercise savedExercise = exerciseService.saveExercise(exercise);

        // Convert saved Exercise to DTO
        ExerciseDTO exerciseDTO = new ExerciseDTO(savedExercise.getId(), savedExercise.getExercise(), savedExercise.getBody_part(), savedExercise.getUser().getUsername(), savedExercise.getDate());

        return ResponseEntity.ok(exerciseDTO);
    }




    @PostMapping("/set")
    public ResponseEntity<Map<String, Object>> createSet(@RequestHeader(value="Authorization") String authorizationHeader, @RequestBody Map<String, Object> setData) {
        User user = userService.getUserFromToken(authorizationHeader);
        int reps = Integer.parseInt(setData.get("Reps").toString());
        double weight = Double.parseDouble(setData.get("Weight").toString());
        Long exerciseId = Long.parseLong(setData.get("exerciseId").toString());
        Exercise exercise = exerciseService.getExerciseById(exerciseId);
        boolean working_set = (boolean) setData.get("IsWorkingSet");
        Set set = new Set(reps, weight, user, exercise, working_set);
        set = setsRepository.save(set);  // Save and receive the persisted object

        // Create a response map containing only the necessary details
        Map<String, Object> response = new HashMap<>();
        response.put("id", set.getId());
        response.put("reps", set.getReps());
        response.put("weight", set.getWeight());
        response.put("isWorkingSet", set.isWorking_set());

        return ResponseEntity.ok(response);  // Return the map
    }

    @GetMapping("/exercise")
    public ResponseEntity<List<Map<String, Object>>> getAllExercises(
            @RequestHeader(value = "Authorization") String authorizationHeader,
            @RequestParam(value = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        User user = userService.getUserFromToken(authorizationHeader);
        List<Exercise> exercises;

        if (date != null) {
            exercises = exerciseService.getExercisesByUserAndDate(user, date);
        } else {
            exercises = exerciseService.getExercisesByUser(user);
        }

        List<Map<String, Object>> exerciseList = new ArrayList<>();
        for (Exercise exercise : exercises) {
            Map<String, Object> exerciseMap = new HashMap<>();
            exerciseMap.put("id", exercise.getId());
            exerciseMap.put("name", exercise.getExercise());
            exerciseMap.put("bodyPart", exercise.getBody_part());
            exerciseMap.put("date", exercise.getDate());
            List<Set> sets = setService.getSetsByExercise(exercise);
            List<Map<String, Object>> setList = new ArrayList<>();
            for (Set set : sets) {
                Map<String, Object> setMap = new HashMap<>();
                setMap.put("id", set.getId());
                setMap.put("reps", set.getReps());
                setMap.put("weight", set.getWeight());
                setMap.put("isWorkingSet", set.isWorking_set());
                setList.add(setMap);
            }

            exerciseMap.put("sets", setList);
            exerciseList.add(exerciseMap);
        }
        return ResponseEntity.ok(exerciseList);
    }


    @DeleteMapping("/deleteSet/{setId}")
    public ResponseEntity<?> deleteSet(@PathVariable Long setId) {
        try {
            setService.deleteSet(setId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Set not found");
        }
    }

    @DeleteMapping("/deleteExercise/{exerciseId}")
    public ResponseEntity<?> deleteExercise(@PathVariable Long exerciseId) {
        try {
            exerciseService.deleteExercise(exerciseId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Exercise not found");
        }
    }

}

