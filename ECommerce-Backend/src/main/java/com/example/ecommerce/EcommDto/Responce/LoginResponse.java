package com.example.ecommerce.EcommDto.Responce;

public class LoginResponse {
    private boolean success;
    private String message;
    private Long id;
    private String username;
    private String email;

    public LoginResponse(boolean success, String message, Long id, String username, String email) {
        this.success = success;
        this.message = message;
        this.id = id;
        this.username = username;
        this.email = email;
    }

    public LoginResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
        this.id = null;
        this.username = null;
        this.email = null;
    }

    public boolean isSuccess() { return success; }
    public String getMessage() { return message; }
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
}