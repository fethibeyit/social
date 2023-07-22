package com.fethibey.social.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Date;
import java.util.UUID;

@Entity
@Data
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO,
            generator = "UUID")
    private UUID id;
    private Date createdAt = new Date(System.currentTimeMillis());
    private Date deleted = null;
}
