package com.fethibey.social.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;

@MappedSuperclass
@Data
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO,
            generator = "UUID")
    protected UUID id;
    protected Timestamp createdAt = new Timestamp(System.currentTimeMillis());
    protected Timestamp deleted = null;
}
