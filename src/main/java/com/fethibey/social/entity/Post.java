package com.fethibey.social.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "posts")
public class Post extends BaseEntity {

    private String title;
    private String content;

    @OneToMany
    private Set<Like> likes;

    @OneToMany(mappedBy = "post")
    private Set<Share> shares;

    @OneToMany
    private Set<Image> images;

    @OneToMany(mappedBy = "post")
    private Set<Comment> comments;

    @OneToMany
    private Set<Tag> tags;

    @ManyToOne
    private AppUser author;

    @ManyToOne
    private Group group;

    @ManyToOne
    private Page page;

}
