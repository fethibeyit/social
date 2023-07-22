package com.fethibey.social.service;

import com.fethibey.social.entity.Post;
import com.fethibey.social.model.post.PostCreateModel;
import com.fethibey.social.model.post.PostModel;
import com.fethibey.social.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.apache.catalina.mapper.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;


@Service
@AllArgsConstructor
public class PostService {

    private final PostRepository repository;
    private final ModelMapper mapper;

    public List<PostModel> getAllPost() {
        var result = repository.findAll().stream().map(x -> mapper.map(x, PostModel.class)).toList();
        return result;
    }

    public PostModel createPost(PostCreateModel model) {
        var entity = mapper.map(model, Post.class);
        entity.setPublicationDate(new Date(System.currentTimeMillis()));
        var createdEntity = repository.save(entity);
        return mapper.map(createdEntity, PostModel.class);
    }

}
