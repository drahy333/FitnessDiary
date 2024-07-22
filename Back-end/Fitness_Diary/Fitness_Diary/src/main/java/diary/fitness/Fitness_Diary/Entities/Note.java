package diary.fitness.Fitness_Diary.Entities;

import jakarta.persistence.*;

@Entity
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cardio_id")
    private Cardio cardio;

    private String text;

    public Note(Cardio cardio, String text) {
        this.cardio = cardio;
        this.text = text;
    }

    public Note() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cardio getCardio() {
        return cardio;
    }

    public void setCardio(Cardio cardio) {
        this.cardio = cardio;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    // Getters and Setters
}
