package com.fethibey.social.service;

import com.fethibey.social.entity.Post;
import com.fethibey.social.exception.NotFoundException;
import com.fethibey.social.model.post.PostCreateModel;
import com.fethibey.social.model.post.PostModel;
import com.fethibey.social.model.post.PostUpdateModel;
import com.fethibey.social.repository.AppUserRepository;
import com.fethibey.social.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

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
        var posts = repository.findAll(pageable).getContent();
        List<PostModel> result = null;
        try {
            result = posts.stream()
                    .map(x -> mapper.map(x, PostModel.class))
                    .toList();
        } catch (Exception e) {
            System.out.println(e.getMessage());        }
        return result;
    }

    public List<PostModel> getPostsByAuthorPageable(UUID authorId, Pageable pageable, Authentication authentication) {
        var author = userRepository.findById(authorId).orElseThrow(() -> new NotFoundException());
        var posts = repository.findAllByAuthor(author, pageable).getContent();
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
        var currentUser = userRepository.findById(UUID.fromString(authentication.getName()))
                .orElseThrow(() -> new NotFoundException());
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
