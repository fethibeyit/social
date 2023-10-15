package com.fethibey.social.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "comments")
public class Comment extends BaseEntity {

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    private AppUser author;

    @ManyToOne
    private Post post;

    @OneToMany
    private Set<Tag> tags;

    @OneToMany
    private Set<Like> likes;

    @OneToMany
    private Set<Comment> replies;

}
