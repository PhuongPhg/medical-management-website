package com.example.demo.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
public class Appointment {
    private @Id @GeneratedValue Long id;
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());
    
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime appointmentStartTime;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime appointmentEndTime;
    
//    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
//    private LocalDateTime canceledAt;

    private String subject;
    
    private String notes;
    
    private String description;
    
    private String nameOfDoctor;

    private String nameOfPatient;

    @NotBlank
	private long doctorId;
    
    @NotBlank
	private long patientId;
    
	private AppointmentStatus status = AppointmentStatus.SCHEDULED;
    
	private BigDecimal price;
	
	private LocalDate appointmentDate;
    
    public Appointment() {

    }

    public Appointment(Timestamp createdAt, long doctorId, long patientId, String subject, LocalDate appointmentDate, LocalDateTime appointmentStartTime, LocalDateTime appointmentEndTime, String nameOfDoctor, String nameOfPatient, AppointmentStatus status, String notes, String description, BigDecimal price) {
        this.createdAt = createdAt;
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.subject = subject;
        this.notes = notes;
        this.description = description;
        this.appointmentDate = appointmentDate;
        this.appointmentStartTime = appointmentStartTime;
        this.appointmentEndTime = appointmentEndTime;
        this.nameOfDoctor = nameOfDoctor;
        this.nameOfPatient = nameOfPatient;
        this.status = status;
        this.price = price;
    }

    public Appointment(LocalDate appointmentDate, LocalDateTime appointmentStartTime, LocalDateTime appointmentEndTime, String nameOfDoctor, BigDecimal price) {
        this.appointmentDate = appointmentDate;
        this.appointmentStartTime = appointmentStartTime;
        this.appointmentEndTime = appointmentEndTime;
        this.nameOfDoctor = nameOfDoctor;
        this.price = price;
    }

    public Appointment(LocalDate appointmentDate, String nameOfDoctor, BigDecimal price) {
        this.appointmentDate = appointmentDate;
        this.nameOfDoctor = nameOfDoctor;
        this.price = price;
    }
    
    public int compareTo(Appointment o) {
        return this.getAppointmentStartTime().compareTo(o.getAppointmentStartTime());
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

	public long getPatientId() {
		return patientId;
	}

	public void setPatientId(long patientId) {
		this.patientId = patientId;
	}
	
	public long getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(long doctorId) {
		this.doctorId = doctorId;
	}
	
    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public LocalDateTime getAppointmentStartTime() {
        return appointmentStartTime;
    }

    public void setAppointmentStartTime(LocalDateTime appointmentStartTime) {
        this.appointmentStartTime = appointmentStartTime;
    }

    public LocalDateTime getAppointmentEndTime() {
        return appointmentEndTime;
    }

    public void setAppointmentEndTime(LocalDateTime appointmentEndTime) {
        this.appointmentEndTime = appointmentEndTime;
    }

    public String getNameOfDoctor() {
        return nameOfDoctor;
    }

    public void setNameOfDoctor(String nameOfDoctor) {
        this.nameOfDoctor = nameOfDoctor;
    }
    
    public String getNameOfPatient() {
        return nameOfPatient;
    }

    public void setNameOfPatient(String nameOfPatient) {
        this.nameOfPatient = nameOfPatient;
    }
    
    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getNotes() {
    	return notes;
    }
    
    public void setNotes(String notes) {
    	this.notes = notes;
    }
    
    public String getDescription() {
    	return description;
    }
    
    public void setDescription(String description) {
    	this.description = description;
    }
    
    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }
    

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

}
