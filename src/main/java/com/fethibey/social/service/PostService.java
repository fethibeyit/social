package com.fethibey.social.service;

import com.fethibey.social.entity.Post;
import com.fethibey.social.helper.UpdateMapper;
import com.fethibey.social.model.post.PostCreateModel;
import com.fethibey.social.model.post.PostModel;
import com.fethibey.social.model.post.PostUpdateModel;
import com.fethibey.social.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.apache.catalina.mapper.Mapper;
import org.modelmapper.ModelMapper;
import org.modelmapper.Provider;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.UUID;


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

    public PostModel updatePost(UUID id, PostUpdateModel model) {
        var entity = repository.findById(id).orElseThrow(() -> new RuntimeException());

        var updated = UpdateMapper.map(model, entity);

        var updatedEntity = repository.save(updated);

        return mapper.map(updatedEntity, PostModel.class);
    }

}
