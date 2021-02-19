package com.example.demo.security.services;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.demo.security.services.AppointmentService;
import com.example.demo.security.services.ScheduledTasksService;

@Component
public class ScheduledTasksServiceImpl implements ScheduledTasksService {

    private final AppointmentService appointmentService;
 
    public ScheduledTasksServiceImpl(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // runs every 30 minutes
    @Scheduled(fixedDelay = 30 * 60 * 1000)
    @Override
    public void updateAllAppointmentsStatuses() {
        appointmentService.updateAllAppointmentsStatuses();
    }
}
