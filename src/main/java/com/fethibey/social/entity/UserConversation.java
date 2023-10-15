package com.fethibey.social.entity;

import com.fethibey.social.enums.MemberType;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users_conversations")
public class UserConversation extends BaseEntity {

    @ManyToOne
    private AppUser user;

    @ManyToOne
    private Conversation conversation;

    @Enumerated(EnumType.STRING)
    private MemberType Membertype = MemberType.BASIC;
    
}
