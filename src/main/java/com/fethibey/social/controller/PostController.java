package com.fethibey.social.controller;

import com.fethibey.social.model.PostModel;
import com.fethibey.social.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/posts")
public class PostController {

    private final PostService service;

    @GetMapping
    public List<PostModel> GetAllPosts(){
        return service.getAllPost();
    }

}
