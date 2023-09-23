package com.fethibey.social.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.UUID;



@MappedSuperclass
@Data
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO,
            generator = "UUID")
    protected UUID id;
    protected Date createdAt = new Date(System.currentTimeMillis());
    protected Date deleted = null;
}
