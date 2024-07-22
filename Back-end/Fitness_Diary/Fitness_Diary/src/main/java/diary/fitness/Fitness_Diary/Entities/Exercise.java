

package diary.fitness.Fitness_Diary.Entities;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;

@Entity
@Table(name = "exercises")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String exercise;
    private String body_part;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Getters and setters
    public Exercise() {
    }

    // Add constructors, getters, and setters here
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    public Exercise(String exercise, String bodyPart, User user, LocalDate date) {
        this.exercise = exercise;
        this.body_part = bodyPart;
        this.user = user;
        this.date = date;

    }

    public Long getId() {
        return id;
    }
    @Getter
    @Column(name = "date", nullable = false)
    private LocalDate date;  // Add a LocalDate field

    public void setId(Long id) {
        this.id = id;
    }

    public String getExercise() {
        return exercise;
    }

    public void setExercise(String exercise) {
        this.exercise = exercise;
    }

    public String getBody_part() {
        return body_part;
    }

    public void setBody_part(String body_part) {
        this.body_part = body_part;
    }
}
