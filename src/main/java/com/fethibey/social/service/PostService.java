package com.fethibey.social.service;

import com.fethibey.social.entity.Post;
import com.fethibey.social.entity.Tag;
import com.fethibey.social.exception.NotFoundException;
import com.fethibey.social.model.post.*;
import com.fethibey.social.repository.AppUserRepository;
import com.fethibey.social.repository.PostRepository;
import com.fethibey.social.repository.TagRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.UUID;


@Service
@AllArgsConstructor
public class PostService {

    private final PostRepository repository;
    private final AppUserRepository userRepository;
    private final ModelMapper mapper;

    public List<PostModel> getAllPost() {

        var result = repository.findAll().stream().map(x -> mapper.map(x, PostModel.class)).toList();
        return result;
    }

    public List<PostModel> getAllPostsPageable(Pageable pageable, Authentication authentication) {
        var currentUser = userRepository.findByEmail(authentication.getName());
        var posts = repository.findAllByAuthor(currentUser, pageable).getContent();

        List<PostModel> result = null;
        try {
            result = posts.stream()
                    .map(x -> mapper.map(x, PostModel.class))
                    .toList();
        } catch (Exception e) {
            System.out.println(e.getMessage());        }
        return result;
    }

    public PostModel getById(UUID id) {
        var entity = repository.findById(id).orElseThrow(() -> new NotFoundException(id));
        return mapper.map(entity, PostModel.class);
    }

    public PostModel createPost(PostCreateModel model, Authentication authentication) {
        var entity = mapper.map(model, Post.class);
        var userEmail = authentication.getName();
        var currentUser = userRepository.findByEmail(userEmail);
        if (currentUser == null) throw new NotFoundException();
        entity.setAuthor(currentUser);
        var createdEntity = repository.saveAndFlush(entity);
        return mapper.map(createdEntity, PostModel.class);
    }

    public PostModel updatePost(UUID id, PostUpdateModel model) {
        var entity = repository.findById(id).orElseThrow(() -> new NotFoundException(id));
        mapper.map(model, entity);
        var updatedEntity = repository.save(entity);
        return mapper.map(updatedEntity, PostModel.class);
    }

    public void deletePost(UUID id) {
        var entity = repository.findById(id).orElseThrow(() -> new NotFoundException(id));
        repository.delete(entity);
    }

}
