package com.fethibey.social.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "messages")
public class Message extends BaseEntity {

    private String content;

    @OneToMany
    private Set<Like> likes;

    @OneToMany
    private Set<Image> images;

    @OneToMany
    private Set<Tag> tags;

    @ManyToOne
    private AppUser sender;

    @ManyToOne
    private Conversation conversation;
    
}
