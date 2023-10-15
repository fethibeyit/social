package com.fethibey.social.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "shares")
public class Share extends BaseEntity {

    @ManyToOne
    private AppUser owner;

    @ManyToOne
    private Post post;
    
}
