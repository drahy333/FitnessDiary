package diary.fitness.Fitness_Diary.Entities;

import jakarta.persistence.*;
import lombok.Getter;

@Entity(name = "login")
public class LoginToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String token;

    @Getter
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}

