package com.example.loganalyzer.service;

import com.example.loganalyzer.model.LogAnalysis;
import com.example.loganalyzer.repository.LogAnalysisRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LogService {

    private final LogAnalysisRepository repo;

    public LogService(LogAnalysisRepository repo) {
        this.repo = repo;
    }

    public LogAnalysis analyzeAndSave(MultipartFile file, String email) throws Exception {

    if (file == null || file.isEmpty()) {
        throw new Exception("File is empty");
    }

    LogAnalysis log = new LogAnalysis();
    log.setFileName(file.getOriginalFilename());
    log.setEmail(email);
    log.setErrorCount(1);
    log.setWarningCount(0);
    log.setStatus("PROCESSED");
    log.setCreatedAt(LocalDateTime.now());

    return repo.save(log);
}


    public List<LogAnalysis> getLogs(String email) {
        return repo.findByEmail(email);
    }
}
