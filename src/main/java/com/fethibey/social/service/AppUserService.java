package com.fethibey.social.service;

import com.fethibey.social.entity.AppUser;
import com.fethibey.social.exception.NotFoundException;
import com.fethibey.social.model.user.AppUserModel;
import com.fethibey.social.repository.AppUserRepository;
import com.fethibey.social.repository.AppUserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
@AllArgsConstructor
public class AppUserService {

    private final AppUserRepository repository;
    private final ModelMapper mapper;

    public List<AppUserModel> getAllAppUser() {
        var users = repository.findAll();
        var result = users.stream().map(x -> mapper.map(x, AppUserModel.class)).toList();
        result.forEach(x -> x.setName(x.getFirstName() + " " + x.getLastName()));
        return result;
    }

    public List<AppUserModel> getAllAppUsersPageable(Pageable pageable) {
        var appUsers = repository.findAll(pageable).getContent();
        return appUsers.stream().map(x -> mapper.map(x, AppUserModel.class)).toList();
    }

    public AppUserModel getById(UUID id) {
        var entity = repository.findById(id).orElseThrow(() -> new NotFoundException(id));
        return mapper.map(entity, AppUserModel.class);
    }

//    public AppUserModel updateAppUser(UUID id, AppUserUpdateModel model) {
//        var entity = repository.findById(id).orElseThrow(() -> new NotFoundException(id));
//        mapper.map(model, entity);
//        var updatedEntity = repository.save(entity);
//        return mapper.map(updatedEntity, AppUserModel.class);
//    }

    public void deleteAppUser(UUID id) {
        var entity = repository.findById(id).orElseThrow(() -> new NotFoundException(id));
        repository.delete(entity);
    }

}
