package com.fethibey.social.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "friends")
public class Friends extends BaseEntity {

    @ManyToOne
    private AppUser user;

    @ManyToOne
    private AppUser friend;

    
}
