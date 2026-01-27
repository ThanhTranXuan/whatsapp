package com.whatsapp.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.whatsapp.backend.model.User;
public interface UserRepository extends JpaRepository<User,Long>{
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
