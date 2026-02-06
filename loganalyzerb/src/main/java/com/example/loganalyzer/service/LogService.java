package com.example.loganalyzer.service;

import com.example.loganalyzer.model.LogAnalysis;
import com.example.loganalyzer.repository.LogAnalysisRepository;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class LogService {

    private final LogAnalysisRepository repo;

    public LogService(LogAnalysisRepository repo) {
        this.repo = repo;
    }
    public LogAnalysis analyzeAndSave(MultipartFile file, String email) {

    int errorCount = 0;
    int warningCount = 0;

    try (BufferedReader reader = new BufferedReader(
            new InputStreamReader(file.getInputStream()))) {

        String line;
        while ((line = reader.readLine()) != null) {
            if (line.contains("ERROR")) errorCount++;
            if (line.contains("WARN")) warningCount++;
        }

    } catch (Exception e) {
        throw new RuntimeException("Failed to read log file");
    }

    LogAnalysis log = new LogAnalysis();
    log.setFileName(file.getOriginalFilename());
    log.setEmail(email);
    log.setErrorCount(errorCount);
    log.setWarningCount(warningCount);
    log.setStatus(
        errorCount > 0 ? "ERRORS FOUND" : "CLEAN"
    );
    log.setCreatedAt(LocalDateTime.now());

    return repo.save(log);
}

    public List<LogAnalysis> getLogs(String email) {
        return repo.findByEmail(email);
    }
}
