package com.fethibey.social.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "users_pages")
public class UserPage extends BaseEntity {

    @ManyToOne
    private AppUser user;

    @ManyToOne
    private Page page;

}
