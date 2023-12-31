package com.fethibey.social.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "posts")
public class Post extends BaseEntity {

    @Column(columnDefinition = "TEXT")
    private String content;

    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id")
    private List<Like> likes;

    @OneToMany(mappedBy = "post")
    private List<Share> shares;

    @OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id")
    private List<FileInfo> files;


    @OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id")
    private List<Comment> comments;

    @OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id")
    private List<Tag> tags;

    @ManyToOne
    @EqualsAndHashCode.Exclude @ToString.Exclude
    private AppUser author;

    @ManyToOne
    private Group group;

    @ManyToOne
    private Page page;

}
