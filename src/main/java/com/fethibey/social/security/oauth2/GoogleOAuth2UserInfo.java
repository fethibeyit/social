package com.fethibey.social.security.oauth2;

import com.fethibey.social.enums.SocialProvider;

import java.util.Map;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

	public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getId() {
		return (String) attributes.get("sub");
	}

	@Override
	public String getFullName() {
		return (String) attributes.get("name");
	}

	@Override
	public String getFirstName() {
		return (String) attributes.get("given_name");
	}

	@Override
	public String getLastName() {
		return (String) attributes.get("family_name");
	}

	@Override
	public String getEmail() {
		return (String) attributes.get("email");
	}

	@Override
	public String getImageUrl() {
		return (String) attributes.get("picture");
	}

	@Override
	public SocialProvider getSocialProvider() {
		return SocialProvider.GOOGLE;
	}
}