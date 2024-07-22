package diary.fitness.Fitness_Diary.Entities;

import jakarta.persistence.*;

@Entity
public class SleepNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sleep_id")
    private Sleep sleep;

    private String text;

    public SleepNote(Sleep sleep, String text) {
        this.sleep = sleep;
        this.text = text;
    }

    public SleepNote() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Sleep getSleep() {
        return sleep;
    }


    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    // Getters and Setters
}
