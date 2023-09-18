package com.fethibey.social.security.service;

import com.fethibey.social.entity.AppUser;
import com.fethibey.social.model.user.AppUserCreateModel;
import com.fethibey.social.repository.AppUserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@AllArgsConstructor
public class AppUserService {

    private AppUserRepository repository;
    private final ModelMapper mapper;
    private PasswordEncoder passwordEncoder;

    public void createAppUser(AppUserCreateModel model){
        var entity = mapper.map(model, AppUser.class);
        entity.setUsername(model.getEmail());
        entity.setPassword(passwordEncoder.encode(model.getPassword()));
        entity.setPosts(new ArrayList<>());
        // todo
        repository.save(entity);
    }


}
