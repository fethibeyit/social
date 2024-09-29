package com.fethibey.social.security.model;

import lombok.Value;

import java.util.List;

@Value
public class AppUserInfo {

    private String id, firstname, lastname, email;
    private List<String> roles;
}
