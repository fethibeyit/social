package com.fethibey.social.security.controller;

import com.fethibey.social.model.user.AppUserCreateModel;
import com.fethibey.social.model.user.ProfileModel;
import com.fethibey.social.security.jwt.TokenProvider;
import com.fethibey.social.security.model.JwtRequest;
import com.fethibey.social.security.model.LocalUser;
import com.fethibey.social.security.service.AuthUserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


import java.util.Map;

@RestController
@AllArgsConstructor
public class JwtAuthenticationController {

    private AuthenticationManager authenticationManager;
    private AuthUserService userService;
    private TokenProvider tokenProvider;

    @GetMapping("/profile")
    public ResponseEntity<ProfileModel> infos(Authentication authentication){
        var profile = new ProfileModel();
        if(authentication != null) {
            LocalUser userPrincipal = (LocalUser) authentication.getPrincipal();
            profile.setFullname(userPrincipal.getName());
            profile.setAuthorities(userPrincipal.getAuthorities().stream().toList());
            profile.setUser_id(userPrincipal.getUser().getId());
        }
        return new ResponseEntity(profile, HttpStatus.OK);
    }

    @PostMapping("/auth")
    public Map<String,String> token(@RequestBody JwtRequest jwtRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword())
        );
        var jwt = tokenProvider.createToken(authentication);
        return Map.of("access-token",jwt);
    }

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody AppUserCreateModel model){
        userService.createAppUser(model);
        return new ResponseEntity(HttpStatus.OK);
    }
}