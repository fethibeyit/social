package com.fethibey.social.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fethibey.social.enums.SocialProvider;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class AppUser extends BaseEntity implements UserDetails {

    private String email;
    private String password;
    private String fullName;

    private String providerUserId;

    @Enumerated(EnumType.STRING)
    private SocialProvider provider;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "user_role", joinColumns = { @JoinColumn(name = "USER_ID") }, inverseJoinColumns = { @JoinColumn(name = "ROLE_ID") })
    private Set<AppRole> roles;

    @OneToMany(mappedBy = "author")
    private List<Post> posts;

    private boolean enabled = true;

    private boolean locked = false;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new ArrayList<GrantedAuthority>();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isEnabled() {
        return enabled ;
    }
    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }


}
