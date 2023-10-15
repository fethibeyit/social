package com.fethibey.social.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "groups")
public class Group extends BaseEntity {

    private String name;

    @OneToOne
    private Image coverPicture;

    @OneToMany(mappedBy = "group")
    private Set<Post> posts;

    @OneToMany(mappedBy = "group")
    private Set<UserGroup> users;
    
}
