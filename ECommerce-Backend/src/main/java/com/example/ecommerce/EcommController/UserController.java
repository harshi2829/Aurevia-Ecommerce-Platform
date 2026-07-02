package com.example.ecommerce.EcommController;

import com.example.ecommerce.EcommDto.Responce.LoginResponse;
import com.example.ecommerce.EcommService.UserService;
import com.example.ecommerce.EcommEntity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

  @Autowired
  public UserService service;

  // register() is UNCHANGED
  @PostMapping("/userRegister")
  public String register(@RequestBody UserEntity user) {
    return service.register(user);
  }

  // login() now returns LoginResponse
  @PostMapping("/userLogin")
  public LoginResponse login(@RequestBody UserEntity user) {
    return service.login(user.getUsername(), user.getPassword());
  }
}