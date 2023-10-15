package com.fethibey.social.entity;

import com.fethibey.social.enums.MemberType;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users_groups")
public class UserGroup extends BaseEntity {

    @ManyToOne
    private AppUser user;

    @ManyToOne
    private Group group;

    @Enumerated(EnumType.STRING)
    private MemberType Membertype = MemberType.BASIC;
    
}
