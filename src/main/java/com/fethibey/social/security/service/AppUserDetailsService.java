package com.fethibey.social.security.service;

import com.fethibey.social.entity.AppUser;
import com.fethibey.social.entity.Post;
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
public class AppUserDetailsService implements UserDetailsService {

    private AppUserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = repository.findByUsername(username);
        if(user == null) throw new UsernameNotFoundException("User not found with username: " + username);
        return user;
    }

}
