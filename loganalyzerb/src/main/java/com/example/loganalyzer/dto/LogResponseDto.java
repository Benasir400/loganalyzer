package com.example.loganalyzer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class LogResponseDto {
    private String fileName;
    private int errorCount;
    private int warningCount;
    private String status;
    private LocalDateTime createdAt;
}
