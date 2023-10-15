package com.fethibey.social.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "pages")
public class Page extends BaseEntity {

    private String name;

    @OneToMany(mappedBy = "page")
    private Set<Post> posts;

    @OneToMany(mappedBy = "page")
    private Set<UserPage> followers;

    @ManyToOne
    private AppUser owner;
    
}
