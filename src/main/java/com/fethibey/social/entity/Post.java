package com.fethibey.social.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.Set;

@Entity
@Data
@Table(name = "posts")
public class Post extends BaseEntity {

    @Column(columnDefinition = "TEXT")
    private String content;

    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id")
    private Set<Like> likes;

    @OneToMany(mappedBy = "post")
    private Set<Share> shares;

    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id")
    private Set<FileInfo> files;


    @OneToMany(mappedBy = "post")
    private Set<Comment> comments;

    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id")
    private Set<Tag> tags;

    @ManyToOne
    @EqualsAndHashCode.Exclude @ToString.Exclude
    private AppUser author;

    @ManyToOne
    private Group group;

    @ManyToOne
    private Page page;

}
