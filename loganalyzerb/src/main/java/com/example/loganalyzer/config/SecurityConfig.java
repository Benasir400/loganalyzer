package com.example.loganalyzer.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                        "/api/auth/**",
                        "/api/logs/**"   // ✅ ALLOW DASHBOARD + UPLOAD
                ).permitAll()
                .anyRequest().permitAll() // 🔥 VERY IMPORTANT FOR NOW
            );

        return http.build();
    }
}
