package com.fethibey.social.security.oauth2;

import java.util.Map;

public class LinkedinOAuth2UserInfo extends OAuth2UserInfo {

	public LinkedinOAuth2UserInfo(Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getId() {
		return (String) attributes.get("id");
	}

	@Override
	public String getFullName() {
		return ((String) attributes.get("localizedFirstName")).concat(" ").concat((String) attributes.get("localizedLastName"));
	}

	@Override
	public String getFirstName() {
		return null;
	}

	@Override
	public String getLastName() {
		return null;
	}

	@Override
	public String getEmail() {
		return (String) attributes.get("emailAddress");
	}

	@Override
	public String getImageUrl() {
		return (String) attributes.get("pictureUrl");
	}
}