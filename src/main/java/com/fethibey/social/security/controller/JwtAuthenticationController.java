package com.fethibey.social.security.controller;

import com.fethibey.social.entity.AppUser;
import com.fethibey.social.model.post.PostModel;
import com.fethibey.social.model.user.AppUserCreateModel;
import com.fethibey.social.repository.AppUserRepository;
import com.fethibey.social.security.model.JwtRequest;
import com.fethibey.social.security.service.AppUserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class JwtAuthenticationController {
    private JwtEncoder jwtEncoder;
    private AuthenticationManager authenticationManager;
    private AppUserService userService;

    @GetMapping("/profile")
    public Authentication infos(Authentication authentication){
        return authentication;
    }

    @PostMapping("/auth")
    public Map<String,String> token(@RequestBody JwtRequest jwtRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword())
        );

        AppUser user = userService.findUserByEmail(authentication.getName());
        Instant now=Instant.now();
        String scope= authentication.getAuthorities()
                .stream().map(auth->auth.getAuthority())
                .collect(Collectors.joining(" "));
        JwtClaimsSet jwtClaimsSet=JwtClaimsSet.builder()
                .issuedAt(now)
                .subject(user.getId().toString())
                .expiresAt(now.plus(5, ChronoUnit.MINUTES))
                .claim("scope",scope)
                .build();
        JwtEncoderParameters jwtEncoderParameters=
                JwtEncoderParameters.from(
                        JwsHeader.with(MacAlgorithm.HS512).build(),
                        jwtClaimsSet
                );
        Jwt jwt = jwtEncoder.encode(jwtEncoderParameters);
        return Map.of("access-token",jwt.getTokenValue());
    }

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody AppUserCreateModel model){
        userService.createAppUser(model);

        return new ResponseEntity(HttpStatus.OK);
    }
}