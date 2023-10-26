package com.fethibey.social.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fethibey.social.model.BaseModel;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.UUID;

@Entity
@Data
@Table(name = "tags")
public class Tag extends BaseEntity {

    private int position;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private AppUser user;
    private UUID user_id ;

    @ManyToOne
    @JoinColumn(name = "group_id", insertable = false, updatable = false)
    private Group group;
    private UUID group_id;


    @ManyToOne
    @JoinColumn(name = "page_id", insertable = false, updatable = false)
    private Page page;
    private UUID page_id;
}
