package com.example.demo.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);
	List<User> findByPhone(String phone);	
	
	// using native query because of the easy
	@Query(value = "select * from users u inner join user_roles ur on u.id = ur.user_id inner join roles r on r.id = ur.role_id where r.name=\"ROLE_ADMIN\"",nativeQuery = true)
	List<User> findAdmin();
	
	@Query(value = "select * from users u inner join user_roles ur on u.id = ur.user_id inner join roles r on r.id = ur.role_id  where r.name=\"ROLE_DOCTOR\"",nativeQuery = true)
	List<User> findDoctor();
	
	@Query(value = "select * from users u inner join user_roles ur on u.id = ur.user_id inner join roles r on r.id = ur.role_id  where r.name=\"ROLE_PATIENT\"",nativeQuery = true)
	List<User> findPatient();
	

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
	
	Boolean existsByPhone(String phone);
}