package com.example.demo.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.User;
import com.example.demo.repository.UserRepository;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public")
public class PublicController {
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/all")
	public String allAccess() {
		return "Public Content";
	}
	
	@GetMapping("/user/{id}")
	public ResponseEntity<User> getUserById(@PathVariable("id") long id){
		Optional<User> userId = userRepository.findById(id);
		if (userId.isPresent()) {
			return new ResponseEntity<>(userId.get(),HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/user/{id}")
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
	
}