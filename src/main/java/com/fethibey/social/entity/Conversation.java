package com.fethibey.social.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "conversations")
public class Conversation extends BaseEntity {

    private String Name;

    @OneToMany(mappedBy = "conversation")
    private List<UserConversation> members;
    
}
