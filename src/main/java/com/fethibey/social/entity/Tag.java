package com.fethibey.social.entity;

import com.fethibey.social.enums.LikeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "tags")
public class Tag extends BaseEntity {

    private String content;

    @ManyToOne
    private AppUser owner;
    
}
