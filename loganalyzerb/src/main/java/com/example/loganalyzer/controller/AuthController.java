package com.example.loganalyzer.controller;

import com.example.loganalyzer.dto.LoginRequestDto;
import com.example.loganalyzer.dto.LoginResponseDto;
import com.example.loganalyzer.dto.SignupRequestDto;
import com.example.loganalyzer.model.User;
import com.example.loganalyzer.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ✅ SIGNUP
    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequestDto dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());

        return authService.register(user);
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginRequestDto dto) {
        User user = authService.login(dto.getEmail(), dto.getPassword());

        return new LoginResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }
}
