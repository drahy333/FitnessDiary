package diary.fitness.Fitness_Diary.Entities;

import jakarta.persistence.*;

import java.time.Duration;
import java.time.LocalDate;

@Entity
public class Cardio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String duration;

    private int caloriesBurned;

    private LocalDate date;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "exercise")
    private String name;

    public Cardio(String duration, int caloriesBurned, LocalDate date, String exercise, User user) {
        this.duration = duration;
        this.caloriesBurned = caloriesBurned;
        this.date = date;
        this.name = exercise;
        this.user = user;
    }

    public Cardio() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public int getCaloriesBurned() {
        return caloriesBurned;
    }

    public void setCaloriesBurned(int caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getters and Setters
}
