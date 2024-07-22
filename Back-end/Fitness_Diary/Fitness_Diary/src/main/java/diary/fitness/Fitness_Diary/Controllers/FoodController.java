package diary.fitness.Fitness_Diary.Controllers;
import diary.fitness.Fitness_Diary.Entities.Food;
import diary.fitness.Fitness_Diary.Entities.UserNutrition;
import diary.fitness.Fitness_Diary.Repositories.FoodRepository;
import diary.fitness.Fitness_Diary.Repositories.UserNutritionRepository;
import diary.fitness.Fitness_Diary.Services.FoodService;
import diary.fitness.Fitness_Diary.Services.UserNutritionService;
import diary.fitness.Fitness_Diary.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
public class FoodController {

    @Autowired
    private FoodRepository foodRepository;
    @Autowired
    private UserService userService;

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserNutritionRepository userNutritionRepository;
    @Autowired
    private UserNutritionService userNutritionService;

    @GetMapping("/food")
    public ResponseEntity<List<Map<String, Object>>> getAllUserNutritions(@RequestHeader(value="Authorization") String authorizationHeader,
                                                                          @RequestParam(value = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        Long userId = userService.getUserIdFromToken(authorizationHeader);
        List<UserNutrition> userNutritions;
        if (date != null) {
            userNutritions = userNutritionService.getUserNutritionByUserIdAndDate(userId, date);
        } else {
            userNutritions = userNutritionService.getUserNutritionByUserIdAndDate(userId, LocalDate.now());
        }

        List<Map<String, Object>> foodDetails = new ArrayList<>();
        for (UserNutrition userNutrition : userNutritions) {
            Food food = foodService.getFoodById(userNutrition.getFoodId());  // Assuming this method exists
            double amountDouble = (double) userNutrition.getAmount() / 100;
            if (food != null) {
                Map<String, Object> map = new HashMap<>();

                map.put("foodItem", food.getFoodItem());
                map.put("calories", BigDecimal.valueOf(amountDouble * food.getCalories()).setScale(0, RoundingMode.HALF_UP).intValue());
                map.put("carbohydrates", BigDecimal.valueOf(amountDouble * food.getCarbohydrates()).setScale(0, RoundingMode.HALF_UP).intValue());
                map.put("protein", BigDecimal.valueOf(amountDouble * food.getProtein()).setScale(0, RoundingMode.HALF_UP).intValue());
                map.put("fats", BigDecimal.valueOf(amountDouble * food.getFats()).setScale(0, RoundingMode.HALF_UP).intValue());
                map.put("amount", userNutrition.getAmount());
                map.put("date", userNutrition.getDate());
                map.put("id", userNutrition.getId());

                foodDetails.add(map);
            }
        }

        return ResponseEntity.ok(foodDetails);
    }

    @GetMapping("/allFood")
    public ResponseEntity<List<Food>> getAllFoods() {
        List<Food> foods = foodService.getAllFoods();
        return ResponseEntity.ok(foods);
    }

    @PostMapping("/addFood")
    public ResponseEntity<Map<String, Object>> addFood(@RequestHeader(value="Authorization") String authorizationHeader,
                                          @RequestBody Map<String, Object> foodData,
                                          @RequestParam(value = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        String foodItem = foodData.get("foodItem").toString();
        int calories = Integer.parseInt(foodData.get("kcalInput").toString());
        int carbohydrates = Integer.parseInt(foodData.get("carbsInput").toString());
        int protein = Integer.parseInt(foodData.get("proteinInput").toString());
        int fats = Integer.parseInt(foodData.get("fatsInput").toString());

        Long userId = userService.getUserIdFromToken(authorizationHeader);

        // Check if the food item already exists
        Optional<Food> existingFood = foodRepository.findByFoodItem(foodItem);
        Food food;
        if (!existingFood.isPresent()) {
            // If food does not exist, save it to the database
            food = new Food(foodItem, calories, carbohydrates, protein, fats);
            foodRepository.save(food);
        } else {
            food = existingFood.get();
            if (calories != food.getCalories()){
                food.setCalories(calories);
            }
            if (protein != food.getProtein()){
                food.setProtein(protein);
            }
            if (carbohydrates != food.getCarbohydrates()){
                food.setCarbohydrates(carbohydrates);
            }
            if (fats != food.getFats()){
                food.setFats(fats);
            }
        }

//        // Add entry to user_nutrition
//        UserNutrition userNutrition = new UserNutrition();
//        userNutrition.setUserId(userId);
//        userNutrition.setFoodId(food.getId());
//        userNutrition.setAmount(amount);
//        userNutrition.setDate(date);  // Assuming you want to set the current date
//        userNutritionRepository.save(userNutrition);
//
//        double amountDouble = (double) amount / 100;
        Map<String, Object> responseMap = new HashMap<>();
//        responseMap.put("foodItem", food.getFoodItem());
//        responseMap.put("calories", BigDecimal.valueOf(amountDouble * food.getCalories()).setScale(0, RoundingMode.HALF_UP).intValue());
//        responseMap.put("carbohydrates", BigDecimal.valueOf(amountDouble * food.getCarbohydrates()).setScale(0, RoundingMode.HALF_UP).intValue());
//        responseMap.put("protein", BigDecimal.valueOf(amountDouble * food.getProtein()).setScale(0, RoundingMode.HALF_UP).intValue());
//        responseMap.put("fats", BigDecimal.valueOf(amountDouble * food.getFats()).setScale(0, RoundingMode.HALF_UP).intValue());
//        responseMap.put("amount", userNutrition.getAmount());
//        responseMap.put("date", userNutrition.getDate());
//        responseMap.put("id", userNutrition.getId());

        return ResponseEntity.ok(responseMap);
    }

    @PostMapping("/addUserNutrition")
    public ResponseEntity<Map<String, Object>> addUserNutrition(@RequestHeader(value="Authorization") String authorizationHeader,
                                                       @RequestBody Map<String, Object> foodData,
                                                       @RequestParam(value = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        String foodItem = foodData.get("foodItem").toString();
        int calories = Integer.parseInt(foodData.get("kcalInput").toString());
        int carbohydrates = Integer.parseInt(foodData.get("carbsInput").toString());
        int protein = Integer.parseInt(foodData.get("proteinInput").toString());
        int fats = Integer.parseInt(foodData.get("fatsInput").toString());
        int amount = Integer.parseInt(foodData.get("amountInput").toString());

        Long userId = userService.getUserIdFromToken(authorizationHeader);

        // Check if the food item already exists
        Optional<Food> existingFood = foodRepository.findByFoodItem(foodItem);
        Food food;
        food = existingFood.get();


//        // Add entry to user_nutrition
        UserNutrition userNutrition = new UserNutrition();
        userNutrition.setUserId(userId);
        userNutrition.setFoodId(food.getId());
        userNutrition.setAmount(amount);
        userNutrition.setDate(date);  // Assuming you want to set the current date
        userNutritionRepository.save(userNutrition);

        double amountDouble = (double) amount / 100;
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("foodItem", food.getFoodItem());
        responseMap.put("calories", BigDecimal.valueOf(amountDouble * food.getCalories()).setScale(0, RoundingMode.HALF_UP).intValue());
        responseMap.put("carbohydrates", BigDecimal.valueOf(amountDouble * food.getCarbohydrates()).setScale(0, RoundingMode.HALF_UP).intValue());
        responseMap.put("protein", BigDecimal.valueOf(amountDouble * food.getProtein()).setScale(0, RoundingMode.HALF_UP).intValue());
        responseMap.put("fats", BigDecimal.valueOf(amountDouble * food.getFats()).setScale(0, RoundingMode.HALF_UP).intValue());
        responseMap.put("amount", userNutrition.getAmount());
        responseMap.put("date", userNutrition.getDate());
        responseMap.put("id", userNutrition.getId());

        return ResponseEntity.ok(responseMap);
    }

    @DeleteMapping("/deleteFood/{foodId}")
    public ResponseEntity<?> deleteFood(@PathVariable Long foodId) {
        try {
            userNutritionService.deleteUserNutrition(foodId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food not found");
        }
    }
}
