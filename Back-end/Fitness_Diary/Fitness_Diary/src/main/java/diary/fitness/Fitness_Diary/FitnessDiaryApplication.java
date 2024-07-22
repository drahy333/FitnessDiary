package diary.fitness.Fitness_Diary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class FitnessDiaryApplication {

	public static void main(String[] args) {
		SpringApplication.run(FitnessDiaryApplication.class, args);
	}

}
