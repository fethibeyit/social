package com.fethibey.social.controller;

import com.fethibey.social.model.comment.CommentCreateModel;
import com.fethibey.social.model.comment.CommentModel;
import com.fethibey.social.service.CommentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/comments")
public class CommentController {

    private final CommentService service;
    
    @PostMapping
    public ResponseEntity<CommentModel> createComment(@Valid @RequestBody CommentCreateModel model, Authentication authentication){
        return new ResponseEntity(service.createComment(model, authentication),HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommentModel> updateComment(@PathVariable UUID id, @Valid @RequestBody CommentModel model) {
        return new ResponseEntity(service.updateComment(id, model),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteComment(@PathVariable UUID id){
        service.deleteComment(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
