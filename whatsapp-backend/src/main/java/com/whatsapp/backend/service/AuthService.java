package com.whatsapp.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.whatsapp.backend.Exception.BusinessException;
import com.whatsapp.backend.dto.register.RegisterRequest;
import com.whatsapp.backend.model.User;
import com.whatsapp.backend.repository.UserRepository;

@Service
public class AuthService  {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public AuthService(UserRepository userRepository,PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder= passwordEncoder;
    }

    public User register(RegisterRequest register){
        if (userRepository.existsByUsername(register.getUsername())) {
        throw new BusinessException(
            "USERNAME_EXISTS",
            "Username đã tồn tại"
        );
    }

    if (userRepository.existsByEmail(register.getEmail())) {
        throw new BusinessException(
            "EMAIL_EXISTS",
            "Email đã được sử dụng"
        );
    
        }
        User user = new User();
        user.setUsername(register.getUsername());
        user.setEmail(register.getEmail());
        user.setPassword(passwordEncoder.encode(register.getPassword())); 
        user.setFullName(register.getFullName());
        
        return userRepository.save(user);
       
    }
    
}
