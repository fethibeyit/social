package com.fethibey.social.entity;

import com.fethibey.social.enums.LikeType;
import com.fethibey.social.model.BaseModel;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "likes")
public class Like extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private LikeType type;

    @ManyToOne
    private AppUser owner;

}
