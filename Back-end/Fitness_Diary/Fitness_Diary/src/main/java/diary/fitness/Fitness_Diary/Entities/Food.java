package diary.fitness.Fitness_Diary.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class with Jakarta Persistence
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String foodItem;
    private int calories;
    private int carbohydrates;
    private int protein;
    private int fats;

    // Constructors
    public Food() {}

    public Food(String foodItem, int calories, int carbohydrates, int protein, int fats) {
        this.foodItem = foodItem;
        this.calories = calories;
        this.carbohydrates = carbohydrates;
        this.protein = protein;
        this.fats = fats;
    }

    public Long getId() {
        return id;
    }

    public String getFoodItem() {
        return foodItem;
    }

    public int getCalories() {
        return calories;
    }

    public int getCarbohydrates() {
        return carbohydrates;
    }

    public int getProtein() {
        return protein;
    }

    public int getFats() {
        return fats;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFoodItem(String foodItem) {
        this.foodItem = foodItem;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public void setCarbohydrates(int carbohydrates) {
        this.carbohydrates = carbohydrates;
    }

    public void setProtein(int protein) {
        this.protein = protein;
    }

    public void setFats(int fats) {
        this.fats = fats;
    }

    // Getters and Setters
    // ...
}

