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
    private UUID id;
    private Date createdAt = new Date(System.currentTimeMillis());
    private Date deleted = null;
}
