package com.fethibey.social.entity;

import com.fethibey.social.enums.LikeType;
import com.fethibey.social.model.BaseModel;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "likes")
public class Like extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private LikeType type;

    @ManyToOne
    private AppUser owner;

    @ManyToOne
    @JoinColumn(name = "post_id", insertable = false, updatable = false)
    private Post post;
    private UUID post_id ;

    @ManyToOne
    @JoinColumn(name = "comment_id", insertable = false, updatable = false)
    private Comment comment;
    private UUID comment_id ;

    @ManyToOne
    @JoinColumn(name = "message_id", insertable = false, updatable = false)
    private Message message;
    private UUID message_id ;

}
