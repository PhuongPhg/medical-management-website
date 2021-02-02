package com.example.demo.models;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Table(name = "appointments")
public class Appointment {
    private @Id @GeneratedValue Long id;
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());
    private LocalDate appointmentDate;
    private Time appointmentStartTime;
    private Time appointmentEndTime;
    private String subject;
    private String notes;
    private String description;
    private String nameOfDoctor;
	private AppointmentStatus status = AppointmentStatus.SCHEDULED;
    private BigDecimal price;
    
    public Appointment() {

    }

    public Appointment(Timestamp createdAt, String subject, LocalDate appointmentDate, Time appointmentStartTime, Time appointmentEndTime, String nameOfDoctor, AppointmentStatus status, String notes, String description, BigDecimal price) {
        this.createdAt = createdAt;
        this.subject = subject;
        this.notes = notes;
        this.description = description;
        this.appointmentDate = appointmentDate;
        this.appointmentStartTime = appointmentStartTime;
        this.appointmentEndTime = appointmentEndTime;
        this.nameOfDoctor = nameOfDoctor;
        this.status = status;
        this.price = price;
    }

    public Appointment(LocalDate appointmentDate, Time appointmentStartTime, Time appointmentEndTime, String nameOfDoctor, BigDecimal price) {
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

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public Time getAppointmentStartTime() {
        return appointmentStartTime;
    }

    public void setAppointmentStartTime(Time appointmentStartTime) {
        this.appointmentStartTime = appointmentStartTime;
    }

    public Time getAppointmentEndTime() {
        return appointmentEndTime;
    }

    public void setAppointmentEndTime(Time appointmentEndTime) {
        this.appointmentEndTime = appointmentEndTime;
    }

    public String getNameOfDoctor() {
        return nameOfDoctor;
    }

    public void setNameOfDoctor(String nameOfDoctor) {
        this.nameOfDoctor = nameOfDoctor;
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
