package com.fethibey.social.security.oauth2;

import com.fethibey.social.enums.SocialProvider;

import java.util.Map;

public class GithubOAuth2UserInfo extends OAuth2UserInfo {

	public GithubOAuth2UserInfo(Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getId() {
		return ((Integer) attributes.get("id")).toString();
	}

	@Override
	public String getFullName() {
		return (String) attributes.get("name");
	}

	@Override
	public String getFirstName() {
		String name = (String) attributes.get("name");
		if(name == null)
		{
			name = (String) attributes.get("login");
		}
		return name;
	}

	@Override
	public String getLastName() {
		return "";
	}

	@Override
	public String getEmail() {
		String email = (String) attributes.get("email");
		if(email == null) {
			email = "";
		}
		return email;
	}

	@Override
	public String getImageUrl() {
		return (String) attributes.get("avatar_url");
	}

	@Override
	public SocialProvider getSocialProvider() {
		return SocialProvider.GITHUB;
	}
}