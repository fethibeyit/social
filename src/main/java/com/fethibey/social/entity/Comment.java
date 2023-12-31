package com.fethibey.social.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
@Table(name = "comments")
public class Comment extends BaseEntity {

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    private AppUser author;

//    @ManyToOne
//    private Post post;
    private UUID post_id ;

    private UUID reply_id ;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "comment_id")
    private List<Tag> tags;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "comment_id")
    private List<Like> likes;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "reply_id")
    private List<Comment> replies;

}
