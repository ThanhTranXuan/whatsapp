package com.whatsapp.backend.Exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 1. Lỗi DTO
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidation(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult()
          .getFieldErrors()
          .forEach(e ->
              errors.put(e.getField(), e.getDefaultMessage())
          );

        Map<String, Object> response = new HashMap<>();
        response.put("type", "VALIDATION_ERROR");
        response.put("errors", errors);

        return ResponseEntity.badRequest().body(response);
    }

    // 2. Lỗi nghiệp vụ
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<Object> handleBusiness(BusinessException ex) {

        Map<String, Object> response = new HashMap<>();
        response.put("type", "BUSINESS_ERROR");
        response.put("code", ex.getCode());
        response.put("message", ex.getMessage());

        return ResponseEntity.badRequest().body(response);
    }

    // 3. Lỗi hệ thống – BẮT BUỘC
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleAll(Exception ex) {

        ex.printStackTrace();

        Map<String, Object> response = new HashMap<>();
        response.put("type", "SYSTEM_ERROR");
        response.put("message", "Hệ thống đang gặp sự cố");

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }
}
