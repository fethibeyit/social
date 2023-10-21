package com.fethibey.social.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "messages")
public class Message extends BaseEntity {

    private String content;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "message_id")
    private Set<Like> likes;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "message_id")
    private Set<AppFile> appFiles;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "message_id")
    private Set<Tag> tags;

    @ManyToOne
    private AppUser sender;

    @ManyToOne
    private Conversation conversation;
    
}
