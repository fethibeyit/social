package com.fethibey.social.service;

import com.fethibey.social.entity.Comment;
import com.fethibey.social.exception.NotFoundException;
import com.fethibey.social.model.comment.CommentCreateModel;
import com.fethibey.social.model.comment.CommentModel;
import com.fethibey.social.repository.AppUserRepository;
import com.fethibey.social.repository.CommentRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
@AllArgsConstructor
public class CommentService {

    private final CommentRepository repository;
    private final AppUserRepository userRepository;
    private final ModelMapper mapper;

    public CommentModel createComment(CommentCreateModel model, Authentication authentication) {
        var entity = mapper.map(model, Comment.class);
        var userEmail = authentication.getName();
        var currentUser = userRepository.findByEmail(userEmail);
        if (currentUser == null) throw new NotFoundException();
        entity.setAuthor(currentUser);
        var createdEntity = repository.saveAndFlush(entity);
        return mapper.map(createdEntity, CommentModel.class);
    }

    public CommentModel updateComment(UUID id, CommentModel model) {
        var entity = repository.findById(id).orElseThrow(() -> new NotFoundException(id));
        mapper.map(model, entity);
        var updatedEntity = repository.save(entity);
        return mapper.map(updatedEntity, CommentModel.class);
    }

    public void deleteComment(UUID id) {
        var entity = repository.findById(id).orElseThrow(() -> new NotFoundException(id));
        repository.delete(entity);
    }


}
