package com.fethibey.social.controller;

import com.fethibey.social.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;

@ControllerAdvice
public class GlobalExceptionController {

    @ExceptionHandler(value = NotFoundException.class)
    public ResponseEntity<Object> notFoundException(NotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<Object> badRequestException(MethodArgumentNotValidException ex) {
        var errors = new ArrayList<String>();
        for (var error : ex.getBindingResult().getAllErrors()){
            errors.add(error.getDefaultMessage());
        }
        return new ResponseEntity<>(String.join(", ", errors), HttpStatus.BAD_REQUEST);
    }

}
