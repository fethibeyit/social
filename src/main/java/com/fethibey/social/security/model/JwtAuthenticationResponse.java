package com.fethibey.social.security.model;

import lombok.Value;

@Value
public class JwtAuthenticationResponse {
	private String accessToken;
	private AppUserInfo user;
}