package com.fethibey.social.controller;

import com.fethibey.social.model.post.PostCreateModel;
import com.fethibey.social.model.post.PostModel;
import com.fethibey.social.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public PostModel CreatePost(@RequestBody PostCreateModel model){
        return service.createPost(model);
    }

}
