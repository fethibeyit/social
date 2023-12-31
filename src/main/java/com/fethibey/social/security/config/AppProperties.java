package com.fethibey.social.security.config;

import lombok.Data;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@ConfigurationProperties(prefix = "app")
@Getter
public class AppProperties {
	private final Auth auth = new Auth();
	private final OAuth2 oauth2 = new OAuth2();

	@Data
	public static class Auth {
		private String tokenSecret;
		private long tokenExpirationMsec;
	}

	@Getter
	public static final class OAuth2 {
		private List<String> authorizedRedirectUris = new ArrayList<>();

	}

}