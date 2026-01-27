package com.example.loganalyzer.controller;

import com.example.loganalyzer.dto.LogResponseDto;
import com.example.loganalyzer.model.LogAnalysis;
import com.example.loganalyzer.service.LogService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "http://localhost:3000")
public class LogController {

    private final LogService logService;

    public LogController(LogService logService) {
        this.logService = logService;
    }

    // ✅ UPLOAD & ANALYZE LOG FILE
    @PostMapping(value = "/upload", consumes = "multipart/form-data")
public LogResponseDto uploadLog(
        @RequestParam("file") MultipartFile file,
        @RequestParam("email") String email
) throws Exception {

    System.out.println("🔥 UPLOAD API HIT 🔥");

    LogAnalysis log = logService.analyzeAndSave(file, email);

    return new LogResponseDto(
            log.getFileName(),
            log.getErrorCount(),
            log.getWarningCount(),
            log.getStatus(),
            log.getCreatedAt()
    );
}


    // ✅ GET USER LOG HISTORY (DASHBOARD)
    @GetMapping("/{email}")
    public List<LogResponseDto> getUserLogs(@PathVariable String email) {
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
}
