package com.fethibey.social.controller;

import com.fethibey.social.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionController {

    @ExceptionHandler(value = NotFoundException.class)
    public ResponseEntity<Object> notFoundException(NotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<Object> badRequestException(MethodArgumentNotValidException ex) {
        var errors = ex.getBindingResult().getAllErrors().stream().map(x -> x.getDefaultMessage()).toList();
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

}
