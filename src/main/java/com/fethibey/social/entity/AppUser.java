package com.fethibey.social.entity;

import com.fethibey.social.enums.SocialProvider;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "users")
public class AppUser extends BaseEntity implements UserDetails {

    private String email;
    private String password;
    private String fullName;
    private String firstName;
    private String lastName;

    private String providerUserId;

    @Enumerated(EnumType.STRING)
    private SocialProvider provider;

    @OneToOne
    private FileInfo profilePicture;

    @OneToOne
    private FileInfo coverPicture;

    @OneToMany(mappedBy = "user")
    private List<Friends> friends;

    @OneToMany(mappedBy = "user")
    private List<UserGroup> groups;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<Tag> tags;

    @OneToMany(mappedBy = "user")
    private List<UserConversation> conversations;

    @OneToMany(mappedBy = "recipient")
    private List<UserNotification> notifications;

    @OneToMany(mappedBy = "sender")
    private List<Invitation> sentInvitations;

    @OneToMany(mappedBy = "recipient")
    private List<Invitation> receivedInvitations;

    @OneToMany(mappedBy = "recipient")
    private List<Suggestion> suggestedFriends;

    @OneToMany(mappedBy = "owner")
    private List<Page> pages;

    @OneToMany(mappedBy = "user")
    private List<UserPage> followedPages;

    @ManyToMany
    @JoinTable(name = "users_roles",
            joinColumns = { @JoinColumn(name = "USER_ID") },
            inverseJoinColumns = { @JoinColumn(name = "ROLE_ID") })
    private Set<AppRole> roles;

    @OneToMany(mappedBy = "author")
    private List<Post> posts;

    @OneToMany(mappedBy = "author")
    private List<Comment> comments;

    private boolean enabled = true;

    private boolean locked = false;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(x -> (GrantedAuthority) () -> x.getName()).toList();
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
