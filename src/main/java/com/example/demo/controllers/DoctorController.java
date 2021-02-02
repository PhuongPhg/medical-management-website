package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.MedicalRecord;
import com.example.demo.models.User;
import com.example.demo.repository.MedicalRecordRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")

public class DoctorController {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private MedicalRecordRepository medicalRecordRepository;
	
	@GetMapping("/doctor/patient")
	@PreAuthorize("hasRole('DOCTOR')")
	public ResponseEntity<List<User>> getUserByRolePatient(){
		try {
			List<User> users = new ArrayList<User>();
		    userRepository.findPatient().forEach(users::add);
		    if (users.isEmpty()) {
		    	return new ResponseEntity<>(HttpStatus.NO_CONTENT);
				}
		    return new ResponseEntity<>(users, HttpStatus.OK);				
			} 
		catch (Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/doctor/medicalRecord")
	@PreAuthorize("hasRole('DOCTOR')")
	public ResponseEntity<List<MedicalRecord>> getAllMedicalRecord(){
		try {
			List<MedicalRecord> medicalRecords = new ArrayList<MedicalRecord>();
			medicalRecordRepository.findAll().forEach(medicalRecords::add);
			if (medicalRecords.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(medicalRecords, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/doctor/medicalRecord/{userId}")
	@PreAuthorize("hasRole('DOCTOR')")
	public ResponseEntity<List<MedicalRecord>> getMedicalRecordByUserId(@PathVariable("userId") long userId){
		List<MedicalRecord> medical = new ArrayList<MedicalRecord>();
		medicalRecordRepository.findByUserId(userId).forEach(medical::add);
		try {
			if (medical.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			return new ResponseEntity<>(medical, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		} 
	}
	
	@PostMapping("/doctor/medicalRecord")
	@PreAuthorize("hasRole('DOCTOR')")
	public ResponseEntity<MedicalRecord> addMedicalRecord(@RequestBody MedicalRecord medical){
		try {
			MedicalRecord medicalRecord = medicalRecordRepository.
					save(new MedicalRecord(medical.getDate(),medical.getDoctor(),medical.getUserId(),medical.getFirstname(),medical.getLastname(),medical.getPhone(),medical.getDetails(),medical.getPrescriptions()));
			return new ResponseEntity<>(medicalRecord, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/doctor/medicalRecord/{id}")
	@PreAuthorize("hasRole('DOCTOR')")
	public ResponseEntity<MedicalRecord> updateMedicalRecordById(@PathVariable("id") long id,@RequestBody MedicalRecord medical){
		Optional<MedicalRecord> recordId = medicalRecordRepository.findById(id);
		if (recordId.isPresent()) {
			MedicalRecord recordInfo = recordId.get();
			recordInfo.setDetails(medical.getDetails());
			recordInfo.setPrescriptions(medical.getPrescriptions());
			return new ResponseEntity<>(medicalRecordRepository.save(recordInfo), HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
	}
	
	@DeleteMapping("/doctor/medicalRecord/{id}")
	@PreAuthorize("hasRole('DOCTOR')")
	public ResponseEntity<MedicalRecord> deleteMedicalRecordById(@PathVariable("id") long id){
		try {
			medicalRecordRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/doctor/myProfile")
	@PreAuthorize("hasRole('DOCTOR')")
	public ResponseEntity<User> getMyProfile(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		long userId = userDetails.getId();
		Optional<User> user = userRepository.findById(userId);
		if (user.isPresent()) {
			return new ResponseEntity<>(user.get(),HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/doctor/myProfile")
	@PreAuthorize("hasRole('DOCTOR')")
	public ResponseEntity<User> updateMyProfile(@RequestBody User user){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		long userId = userDetails.getId();
		Optional<User> userID = userRepository.findById(userId);
		if (userID.isPresent()) {
			User userInfo = userID.get();
			userInfo.setFirstname(user.getFirstname());
			userInfo.setLastname(user.getLastname());
			userInfo.setAdress(user.getAddress());
			userInfo.setDob(user.getDob());
			return new ResponseEntity<>(userRepository.save(userInfo),HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	
}