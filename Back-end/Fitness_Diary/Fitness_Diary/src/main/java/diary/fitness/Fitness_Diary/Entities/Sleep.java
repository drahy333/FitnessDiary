package diary.fitness.Fitness_Diary.Entities;

import jakarta.persistence.*;

import java.time.Duration;
import java.time.LocalDate;

@Entity
public class Sleep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sleep_start;

    private String sleep_stop;

    private String duration;

    private LocalDate date;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private int energy;

    public Sleep(String sleep_start, String sleep_stop, LocalDate date, User user, int energy, String duration) {
        this.sleep_start = sleep_start;
        this.sleep_stop = sleep_stop;
        this.date = date;
        this.user = user;
        this.energy = energy;
        this.duration = duration;
    }

    public Sleep() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getSleep_start() {
        return sleep_start;
    }

    public void setSleep_start(String sleep_start) {
        this.sleep_start = sleep_start;
    }

    public String getSleep_stop() {
        return sleep_stop;
    }

    public void setSleep_stop(String sleep_stop) {
        this.sleep_stop = sleep_stop;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getEnergy() {
        return energy;
    }

    public void setEnergy(int energy) {
        this.energy = energy;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    // Getters and Setters
}
