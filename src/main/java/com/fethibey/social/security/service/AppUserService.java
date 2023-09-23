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
import com.fethibey.social.security.model.SignUpRequest;
import com.fethibey.social.security.oauth2.OAuth2UserInfo;
import com.fethibey.social.security.oauth2.OAuth2UserInfoFactory;
import com.fethibey.social.util.GeneralUtils;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;


import java.util.*;

@Service
@AllArgsConstructor
public class AppUserService {

    private AppUserRepository repository;
    private AppRoleRepository roleRepository;
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

    @Transactional(value = "transactionManager")
    public AppUser registerNewUser(final SignUpRequest signUpRequest) throws UserAlreadyExistAuthenticationException {
        if (signUpRequest.getUserID() != null && repository.existsById(signUpRequest.getUserID())) {
            throw new UserAlreadyExistAuthenticationException("User with User id " + signUpRequest.getUserID() + " already exist");
        } else if (repository.existsByEmail(signUpRequest.getEmail())) {
            throw new UserAlreadyExistAuthenticationException("User with email id " + signUpRequest.getEmail() + " already exist");
        }
        AppUser user = buildUser(signUpRequest);
        user = repository.save(user);
        repository.flush();
        return user;
    }

    private AppUser buildUser(final SignUpRequest formDTO) {
        AppUser user = new AppUser();
        user.setFirstName(formDTO.getDisplayName());
        user.setEmail(formDTO.getEmail());
        user.setPassword(passwordEncoder.encode(formDTO.getPassword()));
        final HashSet<AppRole> roles = new HashSet<AppRole>();
        roles.add(roleRepository.findByName(AppRole.ROLE_USER));
        user.setRoles(roles);
        user.setProvider(formDTO.getSocialProvider());
//        user.setEnabled(true);
//        user.setProviderUserId(formDTO.getProviderUserId());
        return user;
    }


    public AppUser findUserByEmail(final String email) {
        return repository.findByEmail(email);
    }


    @Transactional
    public LocalUser processUserRegistration(String registrationId, Map<String, Object> attributes, OidcIdToken idToken, OidcUserInfo userInfo) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId, attributes);
        if (StringUtils.isEmpty(oAuth2UserInfo.getName())) {
            throw new OAuth2AuthenticationProcessingException("Name not found from OAuth2 provider");
        } else if (StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }
        SignUpRequest userDetails = toUserRegistrationObject(registrationId, oAuth2UserInfo);
        AppUser user = findUserByEmail(oAuth2UserInfo.getEmail());
        if (user != null) {
            if (!user.getProvider().equals(registrationId) && !user.getProvider().equals(SocialProvider.LOCAL.getProviderType())) {
                throw new OAuth2AuthenticationProcessingException(
                        "Looks like you're signed up with " + user.getProvider() + " account. Please use your " + user.getProvider() + " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(userDetails);
        }

        return LocalUser.create(user, attributes, idToken, userInfo);
    }

    private AppUser updateExistingUser(AppUser existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setFirstName(oAuth2UserInfo.getName());
        return repository.save(existingUser);
    }

    private SignUpRequest toUserRegistrationObject(String registrationId, OAuth2UserInfo oAuth2UserInfo) {
        return SignUpRequest.getBuilder().addProviderUserID(oAuth2UserInfo.getId()).addDisplayName(oAuth2UserInfo.getName()).addEmail(oAuth2UserInfo.getEmail())
                .addSocialProvider(GeneralUtils.toSocialProvider(registrationId)).addPassword("changeit").build();
    }

    public Optional<AppUser> findUserById(UUID id) {
        return repository.findById(id);
    }

}
