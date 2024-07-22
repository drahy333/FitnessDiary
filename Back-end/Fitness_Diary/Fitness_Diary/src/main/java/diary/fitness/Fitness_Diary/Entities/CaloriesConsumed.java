package diary.fitness.Fitness_Diary.Entities;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Entity
@Table(name = "calories_consumed")
public class CaloriesConsumed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "consumed")
    private Integer consumed;

    @Column(name = "consumed_max")
    private Integer consumedMax;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "bmr")
    private Integer bmr;

    @Column(name = "burned")
    private Integer burned;
}

