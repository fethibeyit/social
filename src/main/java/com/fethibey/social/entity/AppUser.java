package com.fethibey.social.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class AppUser extends BaseEntity {

    private String userName;
    private String password;
    private String firstName;
    private String lastName;
    private String email;

    @OneToMany(mappedBy = "author")
    private List<Post> posts;

}
