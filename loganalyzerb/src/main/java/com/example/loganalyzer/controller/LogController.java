package com.example.loganalyzer.controller;

import com.example.loganalyzer.dto.LogResponseDto;
import com.example.loganalyzer.model.LogAnalysis;
import com.example.loganalyzer.service.LogService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;


import java.util.List;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "http://localhost:3000")
public class LogController {

    private final LogService logService;

    public LogController(LogService logService) {
        this.logService = logService;
    }

    @PostMapping("/upload")
    public LogResponseDto uploadLog(
            @RequestParam("file") MultipartFile file,
            @RequestParam("email") String email
    ) {

        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        LogAnalysis log = logService.analyzeAndSave(file, email);

        return new LogResponseDto(
                log.getFileName(),
                log.getErrorCount(),
                log.getWarningCount(),
                log.getStatus(),
                log.getCreatedAt()
        );
    }

    @GetMapping("/{email}")
    public List<LogResponseDto> getLogs(@PathVariable String email) {
        return logService.getLogs(email)
                .stream()
                .map(log -> new LogResponseDto(
                        log.getFileName(),
                        log.getErrorCount(),
                        log.getWarningCount(),
                        log.getStatus(),
                        log.getCreatedAt()
                ))
                .toList();
    }
    @GetMapping("/export/{email}")
    public ResponseEntity<byte[]> exportLogs(@PathVariable String email) {

    List<LogAnalysis> logs = logService.getLogs(email);

    StringBuilder csv = new StringBuilder();
    csv.append("File Name,Errors,Warnings,Status\n");

    for (LogAnalysis log : logs) {
        csv.append(log.getFileName()).append(",")
           .append(log.getErrorCount()).append(",")
           .append(log.getWarningCount()).append(",")
           .append(log.getStatus()).append("\n");
    }

    byte[] data = csv.toString().getBytes();

    return ResponseEntity.ok()
        .header("Content-Disposition", "attachment; filename=log_report.csv")
        .body(data);
}

}
