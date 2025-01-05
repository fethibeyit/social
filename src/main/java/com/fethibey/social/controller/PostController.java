package com.fethibey.social.controller;

import com.fethibey.social.model.post.PostCreateModel;
import com.fethibey.social.model.post.PostModel;
import com.fethibey.social.model.post.PostUpdateModel;
import com.fethibey.social.service.PostService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/posts")
public class PostController {

    private final PostService service;

    @GetMapping
    public ResponseEntity<List<PostModel>> getAllPostPageable(@RequestParam(defaultValue = "1")  int page,
                                                              @RequestParam(defaultValue = "10")  int size,
                                                              Authentication authentication){
        Pageable paging = PageRequest.of(page-1, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        return new ResponseEntity<>(service.getAllPostsPageable(paging, authentication), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostModel> getById(@PathVariable UUID id){
        return new ResponseEntity<>(service.getById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PostModel> createPost(@Valid @RequestBody PostCreateModel model, Authentication authentication){
        return new ResponseEntity<>(service.createPost(model, authentication),HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostModel> updatePost(@PathVariable UUID id, @Valid @RequestBody PostUpdateModel model) {
        return new ResponseEntity<>(service.updatePost(id, model),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePost(@PathVariable UUID id){
        service.deletePost(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


}
