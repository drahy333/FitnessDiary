package diary.fitness.Fitness_Diary.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "user_login")
public class UserLogin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String token;

    @ManyToOne(fetch = FetchType.LAZY)  // Assuming FetchType.LAZY to avoid unnecessary loading
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  // Replace userId with a User reference

    // Constructors
    public UserLogin() {}

    public UserLogin(String token, User user) {
        this.token = token;
        this.user = user;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
