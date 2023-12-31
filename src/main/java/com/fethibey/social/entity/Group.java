package com.fethibey.social.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "groups")
public class Group extends BaseEntity {

    private String name;

    @OneToOne
    private FileInfo coverPicture;

    @OneToMany(mappedBy = "group")
    private List<Post> posts;

    @OneToMany(mappedBy = "group")
    private List<UserGroup> users;
    
}
