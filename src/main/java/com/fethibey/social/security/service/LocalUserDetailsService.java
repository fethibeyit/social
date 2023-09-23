package com.fethibey.social.security.service;

import com.fethibey.social.entity.AppUser;
import com.fethibey.social.exception.ResourceNotFoundException;
import com.fethibey.social.repository.AppUserRepository;
import com.fethibey.social.security.model.LocalUser;
import com.fethibey.social.util.GeneralUtils;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service("localUserDetailService")
@AllArgsConstructor
public class LocalUserDetailsService implements UserDetailsService {

//    private AppUserRepository repository;
    private AppUserService userService;

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        var user = repository.findByUsername(username);
//        if(user == null) throw new UsernameNotFoundException("User not found with username: " + username);
//        return user;
//    }

    @Override
    @Transactional
    public LocalUser loadUserByUsername(final String email) throws UsernameNotFoundException {
        AppUser user = userService.findUserByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User " + email + " was not found in the database");
        }
        return createLocalUser(user);
    }

    @Transactional
    public LocalUser loadUserById(UUID id) {
        AppUser user = userService.findUserById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return createLocalUser(user);
    }

    /**
     * @param user
     * @return
     */
    private LocalUser createLocalUser(AppUser user) {
        return new LocalUser(user.getEmail(), user.getPassword(), user.isEnabled(), true, true, true, GeneralUtils.buildSimpleGrantedAuthorities(user.getRoles()), user);
    }

}
