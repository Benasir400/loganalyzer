package com.example.loganalyzer.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class LogAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private int errorCount;
    private int warningCount;
    private String status;
    private LocalDateTime createdAt;
    private String email;
}

