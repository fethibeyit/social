package com.fethibey.social.security.model;

import java.util.Collection;
import java.util.Map;

import com.fethibey.social.entity.AppUser;
import com.fethibey.social.util.GeneralUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class LocalUser extends User implements OAuth2User {

    private Map<String, Object> attributes;
    private AppUser user;

    public LocalUser(final String userID, final String password, final boolean enabled, final boolean accountNonExpired, final boolean credentialsNonExpired,
                     final boolean accountNonLocked, final Collection<? extends GrantedAuthority> authorities, final AppUser user) {
        super(userID, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
        this.user = user;
    }

    public static LocalUser create(AppUser user, Map<String, Object> attributes, OidcIdToken idToken, OidcUserInfo userInfo) {
        LocalUser localUser = new LocalUser(user.getEmail(), user.getPassword(), user.isEnabled(), true, true, true, GeneralUtils.buildSimpleGrantedAuthorities(user.getRoles()),
                user);
        localUser.setAttributes(attributes);
        return localUser;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getName() {
        return  String.format("%s %s", this.user.getFirstName(), this.user.getLastName());
    }

    @Override
    public Map<String, Object> getAttributes() {
        return this.attributes;
    }

    public AppUser getUser() {
        return user;
    }
}