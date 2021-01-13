package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import com.example.demo.models.MedicalRecord;

public interface MedicalRecordRepository extends JpaRepositoryImplementation<MedicalRecord,Long> {
	List<MedicalRecord> findByEmail(String email);

}
