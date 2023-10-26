package com.fethibey.social.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "pages")
public class Page extends BaseEntity {

    private String name;

    @OneToOne
    private FileInfo coverPicture;

    @OneToMany(mappedBy = "page")
    private Set<Post> posts;

    @OneToMany(mappedBy = "page")
    private Set<UserPage> followers;

    @ManyToOne
    private AppUser owner;
    
}
