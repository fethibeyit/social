package com.fethibey.social.security.controller;


import com.fethibey.social.model.user.AppUserCreateModel;
import com.fethibey.social.security.jwt.TokenProvider;
import com.fethibey.social.security.model.JwtRequest;
import com.fethibey.social.security.model.LocalUser;
import com.fethibey.social.security.service.AppUserService;
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
    private AppUserService userService;
    private TokenProvider tokenProvider;

    @GetMapping("/api/v1/profile")
    public Map<String,String> infos(Authentication authentication){
        LocalUser userPrincipal = (LocalUser) authentication.getPrincipal();
        var authorities = userPrincipal.getAuthorities();
        String name = userPrincipal.getName();
        return Map.of("profile",name);
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