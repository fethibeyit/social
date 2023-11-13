package com.fethibey.social.model.user;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class ProfileModel {

    private String fullname = "";
    private List<GrantedAuthority> authorities = new ArrayList<>();
    private UUID user_id = null;

}
