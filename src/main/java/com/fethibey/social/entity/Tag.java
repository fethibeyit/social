package com.fethibey.social.entity;

import com.fethibey.social.model.BaseModel;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "tags")
public class Tag extends BaseEntity {

    private int position;

    private UUID user_id ;
    private UUID group_id;
    private UUID page_id;
}
