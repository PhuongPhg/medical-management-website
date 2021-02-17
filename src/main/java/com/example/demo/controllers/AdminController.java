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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.MedicalRecord;
import com.example.demo.models.User;
import com.example.demo.repository.MedicalRecordRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class AdminController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private MedicalRecordRepository medicalRecordRepository;
	
	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminHomePage() {
		return "Welcome Admin";
	}
	
	
	@GetMapping("/admin/user")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<User>> getAllUsers(){
		try {
			List<User> users = new ArrayList<User>();
			userRepository.findAll().forEach(users::add);
			if (users.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(users, HttpStatus.OK);
		}
		catch (Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
			
	}
		
	
	@GetMapping("/admin/user/find")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<User>> getUsersByPhone(@RequestParam("phone") String phone){
		try {
			List<User> users = new ArrayList<User>();
			if (phone == null) {
				userRepository.findAll().forEach(users::add);
			}
			else {
				userRepository.findByPhone(phone).forEach(users::add);
			}
			
			if (users.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(users, HttpStatus.OK);
		}
		catch (Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
			
	}
	
	@GetMapping(value = "/admin/role/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<User>> getUserByRoleAdmin(){
		try {
			List<User> users = new ArrayList<User>();
		    userRepository.findAdmin().forEach(users::add);
		    if (users.isEmpty()) {
		    	return new ResponseEntity<>(HttpStatus.NO_CONTENT);
				}
		    return new ResponseEntity<>(users, HttpStatus.OK);				
			} 
		catch (Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(value = "/admin/role/doctor")
	@PreAuthorize("hasAnyRole('ADMIN', 'PATIENT', 'DOCTOR')")
	public ResponseEntity<List<User>> getUserByRoleDoctor(){
		try {
			List<User> users = new ArrayList<User>();
		    userRepository.findDoctor().forEach(users::add);
		    if (users.isEmpty()) {
		    	return new ResponseEntity<>(HttpStatus.NO_CONTENT);
				}
		    return new ResponseEntity<>(users, HttpStatus.OK);				
			} 
		catch (Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(value = "/admin/role/patient")
	@PreAuthorize("hasRole('ADMIN')")
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

	
	
	@GetMapping("admin/user/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<User> getUserById(@PathVariable("id") long id){
		Optional<User> userId = userRepository.findById(id);
		if (userId.isPresent()) {
			return new ResponseEntity<>(userId.get(),HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("admin/user/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<User> updateUserById(@PathVariable("id") long id, @RequestBody User user){
		Optional<User> userId = userRepository.findById(id);
		if (userId.isPresent()) {
			User userInfo = userId.get();
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
	
	@DeleteMapping("admin/user/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<User> deleteUserById(@PathVariable("id") long id){
		try {
			userRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} 
		catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("admin/medicalRecord")
	@PreAuthorize("hasRole('ADMIN')")
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
	
	@GetMapping("admin/myProfile")
	@PreAuthorize("hasRole('ADMIN')")
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
	
	
}
