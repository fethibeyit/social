package com.fethibey.social.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "messages")
public class Message extends BaseEntity {

    private String content;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "message_id")
    private List<Like> likes;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "message_id")
    private List<FileInfo> fileInfos;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "message_id")
    private List<Tag> tags;

    @ManyToOne
    private AppUser sender;

    @ManyToOne
    private Conversation conversation;
    
}
