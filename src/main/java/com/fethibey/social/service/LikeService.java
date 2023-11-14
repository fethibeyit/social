package com.fethibey.social.service;

import com.fethibey.social.entity.Like;
import com.fethibey.social.entity.Post;
import com.fethibey.social.exception.NotFoundException;
import com.fethibey.social.model.like.LikeCreateModel;
import com.fethibey.social.model.like.LikeModel;
import com.fethibey.social.model.post.PostCreateModel;
import com.fethibey.social.model.post.PostModel;
import com.fethibey.social.model.post.PostUpdateModel;
import com.fethibey.social.repository.AppUserRepository;
import com.fethibey.social.repository.LikeRepository;
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
public class LikeService {

    private final LikeRepository repository;
    private final AppUserRepository userRepository;
    private final ModelMapper mapper;

    public LikeModel createLike(LikeCreateModel model, Authentication authentication) {
        var entity = mapper.map(model, Like.class);
        var userEmail = authentication.getName();
        var currentUser = userRepository.findByEmail(userEmail);
        if (currentUser == null) throw new NotFoundException();
        entity.setOwner(currentUser);
        var createdEntity = repository.saveAndFlush(entity);
        return mapper.map(createdEntity, LikeModel.class);
    }

    public LikeModel updateLike(UUID id, LikeModel model) {
        var entity = repository.findById(id).orElseThrow(() -> new NotFoundException(id));
        mapper.map(model, entity);
        var updatedEntity = repository.save(entity);
        return mapper.map(updatedEntity, LikeModel.class);
    }

    public void deleteLike(UUID id) {
        var entity = repository.findById(id).orElseThrow(() -> new NotFoundException(id));
        repository.delete(entity);
    }


}
