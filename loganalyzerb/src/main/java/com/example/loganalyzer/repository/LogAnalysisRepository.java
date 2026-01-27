package com.example.loganalyzer.repository;

import com.example.loganalyzer.model.LogAnalysis;
//import com.example.loganalyzer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LogAnalysisRepository extends JpaRepository<LogAnalysis, Long> {
    List<LogAnalysis> findByEmail(String email);
}
