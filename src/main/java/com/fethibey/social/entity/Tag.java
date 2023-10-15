package com.fethibey.social.entity;

import com.fethibey.social.model.BaseModel;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "tags")
public class Tag extends BaseEntity {

    private int position;

    @ManyToOne
    private AppUser user;

    @ManyToOne
    private Group group;

    @ManyToOne
    private Page page;

}
