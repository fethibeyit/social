package com.fethibey.social.security.model;

import lombok.Value;

import java.util.List;

@Value
public class AppUserInfo {

    private String id, displayName, email;
    private List<String> roles;
}
