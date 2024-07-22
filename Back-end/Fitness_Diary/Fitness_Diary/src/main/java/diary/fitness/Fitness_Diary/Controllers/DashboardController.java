package diary.fitness.Fitness_Diary.Controllers;

import diary.fitness.Fitness_Diary.Entities.CaloriesConsumed;
import diary.fitness.Fitness_Diary.Entities.Food;
import diary.fitness.Fitness_Diary.Services.CaloriesConsumedService;
import diary.fitness.Fitness_Diary.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class DashboardController {

    public class DoughnutChartData {
        private int consumed;
        private int consumedMax;
        private int remaining;
        private int bmr;
        private int burned;

        // Constructor
        public DoughnutChartData(int consumed, int consumedMax, int bmr, int burned) {
            this.consumed = consumed;
            this.consumedMax = consumedMax;
            this.remaining = consumedMax - consumed;
            this.bmr = bmr;
            this.burned = burned;
        }

        // Getters
        public int getConsumed() {
            return consumed;
        }

        public int getConsumedMax() {
            return consumedMax;
        }

        public int getRemaining() {
            return remaining;
        }

        public int getBmr() {
            return bmr;
        }

        public int getBurned() {
            return burned;
        }
    }

    @Autowired
    UserService userService;

    @Autowired
    CaloriesConsumedService caloriesConsumedService;

    @GetMapping("/consumed")
    public ResponseEntity<List<Map<String, Integer>>> getConsumedData(@RequestHeader(value="Authorization") String authorizationHeader) {


        Long userId = userService.getUserIdFromToken(authorizationHeader);

        // Fetch calories consumed data for the user from the database
        CaloriesConsumed caloriesData = caloriesConsumedService.getCaloriesConsumedByUserId(userId).get();

        // Assuming CaloriesData contains fields for consumed and consumedMax
        int consumed = caloriesData.getConsumed();
        int consumedMax = caloriesData.getConsumedMax();
        
        int bmr = caloriesData.getBmr();
        int burned = caloriesData.getBurned();

        List<Map<String, Integer>> dataList = new ArrayList<>();

        // First HashMap with consumed and consumedMax
        Map<String, Integer> consumedData = new HashMap<>();
        consumedData.put("consumed", consumed);
        consumedData.put("limit", consumedMax);
        dataList.add(consumedData);

        // Second HashMap with bmr and burned
        Map<String, Integer> bmrBurnedData = new HashMap<>();
        bmrBurnedData.put("bmr", bmr);
        bmrBurnedData.put("burned", burned);
        dataList.add(bmrBurnedData);

        // Third HashMap with remaining
//        Map<String, Integer> remainingData = new HashMap<>();
//        remainingData.put("remaining", consumedMax - consumed);
//
//        dataList.add(remainingData);

        return ResponseEntity.ok().body(dataList);
    }



}
