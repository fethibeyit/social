package com.fethibey.social.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "invitations")
public class Invitation extends BaseEntity {

    private String content;

    @ManyToOne
    private AppUser sender;

    @ManyToOne
    private AppUser recipient;
    
}
