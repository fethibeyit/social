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

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "comment_id")
    private Set<Tag> tags;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "comment_id")
    private Set<Like> likes;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "reply_id")
    private Set<Comment> replies;

}
