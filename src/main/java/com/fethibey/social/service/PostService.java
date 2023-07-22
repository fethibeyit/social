package com.fethibey.social.service;

import com.fethibey.social.entity.Post;
import com.fethibey.social.model.PostModel;
import com.fethibey.social.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class PostService {

    private final PostRepository repository;

    public List<PostModel> getAllPost() {
        var mapper = new ModelMapper();
        var result = repository.findAll().stream().map(x -> mapper.map(x, PostModel.class)).toList();
        return result;
    }

}
