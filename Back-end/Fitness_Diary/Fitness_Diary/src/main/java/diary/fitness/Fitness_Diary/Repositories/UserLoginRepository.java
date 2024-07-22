package diary.fitness.Fitness_Diary.Repositories;

import diary.fitness.Fitness_Diary.Entities.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserLoginRepository extends JpaRepository<UserLogin, Long> {
    Optional<UserLogin> findByUserId(Long userId);
    Optional<UserLogin> findByToken(String token);

}

