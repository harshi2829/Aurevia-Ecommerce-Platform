package com.example.ecommerce.EcommService;

import com.example.ecommerce.EcommDto.Responce.LoginResponse;
import com.example.ecommerce.EcommEntity.UserEntity;
import com.example.ecommerce.EcommRepo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class UserService {
    @Autowired
    public UserRepo repo;

    // REGISTER
    public String register(UserEntity user) {
        UserEntity existingUser = repo.findByUsername(user.getUsername());
        UserEntity existingEmail = repo.findByEmail(user.getEmail());
        if (existingUser != null) {
            return "Username Already exist";
        }
        if (existingEmail != null) {
            return "Email ALready exist";
        }
        repo.save(user);
        return "Registered Successfully";
    }

    // LOGIN
    public LoginResponse login(String input, String password) {
        UserEntity user;
        if (input.contains("@")) {
            user = repo.findByEmail(input);
        } else {
            user = repo.findByUsername(input);
        }

        if (user == null) {
            return new LoginResponse(false, "User Not Found");
        }
        if (!user.getPassword().equals(password)) {
            return new LoginResponse(false, "Invalid Password");
        }

        return new LoginResponse(
                true,
                "Login Successfull",
                user.getId(),
                user.getUsername(),
                user.getEmail()
        );
    }
}
