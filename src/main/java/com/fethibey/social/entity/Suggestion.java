package com.fethibey.social.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "suggestions")
public class Suggestion extends BaseEntity {

    @ManyToOne
    private AppUser recipient;

    @ManyToOne
    private AppUser suggested;
    
}
