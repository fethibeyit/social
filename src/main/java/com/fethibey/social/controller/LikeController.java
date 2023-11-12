package com.fethibey.social.controller;

import com.fethibey.social.model.like.LikeModel;
import com.fethibey.social.model.like.LikeCreateModel;
import com.fethibey.social.model.like.LikeModel;
import com.fethibey.social.service.LikeService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/likes")
public class LikeController {

    private final LikeService service;
    
    @PostMapping
    public ResponseEntity<LikeModel> createLike(@Valid @RequestBody LikeCreateModel model, Authentication authentication){
        return new ResponseEntity(service.createLike(model, authentication),HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteLike(@PathVariable UUID id){
        service.deleteLike(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
