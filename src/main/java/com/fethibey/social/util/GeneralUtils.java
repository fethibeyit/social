package com.fethibey.social.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.fethibey.social.entity.AppRole;
import com.fethibey.social.entity.AppUser;
import com.fethibey.social.enums.SocialProvider;
import com.fethibey.social.security.model.AppUserInfo;
import com.fethibey.social.security.model.LocalUser;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public class GeneralUtils {

    public static List<SimpleGrantedAuthority> buildSimpleGrantedAuthorities(final Set<AppRole> roles) {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (AppRole role : roles) {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return authorities;
    }

    public static SocialProvider toSocialProvider(String providerId) {
        for (SocialProvider socialProvider : SocialProvider.values()) {
            if (socialProvider.getProviderType().equals(providerId)) {
                return socialProvider;
            }
        }
        return SocialProvider.LOCAL;
    }

    public static AppUserInfo buildUserInfo(LocalUser localUser) {
        List<String> roles = localUser.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());
        AppUser user = localUser.getUser();
        return new AppUserInfo(user.getId().toString(), user.getFullName(), user.getEmail(), roles);
    }
}