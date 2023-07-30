package com.fethibey.social.security.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("jwt")
public record JwtConfigProperties(String secret) {

}