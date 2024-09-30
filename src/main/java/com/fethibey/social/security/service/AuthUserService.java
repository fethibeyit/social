package com.fethibey.social.security.service;

import com.fethibey.social.entity.AppRole;
import com.fethibey.social.entity.AppUser;
import com.fethibey.social.enums.SocialProvider;
import com.fethibey.social.exception.OAuth2AuthenticationProcessingException;
import com.fethibey.social.exception.UserAlreadyExistAuthenticationException;
import com.fethibey.social.model.user.AppUserCreateModel;
import com.fethibey.social.repository.AppRoleRepository;
import com.fethibey.social.repository.AppUserRepository;
import com.fethibey.social.security.model.LocalUser;
import com.fethibey.social.security.oauth2.OAuth2UserInfo;
import com.fethibey.social.security.oauth2.OAuth2UserInfoFactory;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;


import java.util.*;

@Service
@AllArgsConstructor
public class AuthUserService {

    private AppUserRepository repository;
    private AppRoleRepository roleRepository;
    private final ModelMapper mapper;
    private PasswordEncoder passwordEncoder;

    public void createAppUser(AppUserCreateModel model){
        var entity = mapper.map(model, AppUser.class);
        entity.setPassword(passwordEncoder.encode(model.getPassword()));
        entity.setProvider(SocialProvider.LOCAL);
        var roles = new HashSet<AppRole>();
        roles.add(roleRepository.findByName(AppRole.ROLE_USER));
        entity.setRoles(roles);
        repository.save(entity);
    }

    @Transactional(value = "transactionManager")
    public AppUser registerNewUser(final OAuth2UserInfo userInfo) throws UserAlreadyExistAuthenticationException {
        if (userInfo.getId() != null && repository.existsByProviderId(userInfo.getId())) {
            throw new UserAlreadyExistAuthenticationException("User with Provider Id " + userInfo.getId() + " already exist");
        }
        AppUser user = buildUser(userInfo);
        user = repository.save(user);
        repository.flush();
        return user;
    }

    private AppUser buildUser(final OAuth2UserInfo userInfo) {
        AppUser user = new AppUser();
        user.setFirstName(userInfo.getFirstName());
        user.setLastName(userInfo.getLastName());
        user.setImageUrl(userInfo.getImageUrl());
        user.setProviderId(userInfo.getId());
        user.setEmail(userInfo.getEmail());
        user.setPassword("");
        final HashSet<AppRole> roles = new HashSet<AppRole>();
        roles.add(roleRepository.findByName(AppRole.ROLE_USER));
        user.setRoles(roles);
        user.setProvider(userInfo.getSocialProvider());
        return user;
    }


    public AppUser findUserByEmail(final String email) {
        return repository.findByEmail(email);
    }


    @Transactional
    public LocalUser processUserRegistration(String registrationId, Map<String, Object> attributes) {
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId, attributes);
        if (StringUtils.isEmpty(userInfo.getFirstName())) {
            throw new OAuth2AuthenticationProcessingException("Name not found from OAuth2 provider");
        }
        AppUser user = repository.findByProviderId(userInfo.getId());
        if (user != null) {
            var provider = user.getProvider().getProviderType();
            if (!provider.equals(registrationId) && !user.getProvider().equals(SocialProvider.LOCAL.getProviderType())) {
                throw new OAuth2AuthenticationProcessingException(
                        "You are signed up with " + user.getProvider().getProviderType() + " account. Please use your " + user.getProvider().getProviderType() + " account to login.");
            }
            user = updateExistingUser(user, userInfo);
        } else {
            user = registerNewUser(userInfo);
        }

        return LocalUser.create(user, attributes);
    }

    private AppUser updateExistingUser(AppUser existingUser, OAuth2UserInfo userInfo) {
        existingUser.setFirstName(userInfo.getFirstName());
        existingUser.setLastName(userInfo.getLastName());
        existingUser.setImageUrl(userInfo.getImageUrl());
        return repository.save(existingUser);
    }

    public Optional<AppUser> findUserById(UUID id) {
        return repository.findById(id);
    }

}
