package com.example.demo.repository;

import com.example.demo.models.Appointment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findAllByAppointmentDateBetweenOrderByPriceAsc(LocalDate startDate, LocalDate endDate);
	
    List<Appointment> findByDoctorId(long doctorId);

    List<Appointment> findByPatientId(long patientId);
}
