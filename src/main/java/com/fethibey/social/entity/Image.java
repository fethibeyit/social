package com.fethibey.social.entity;

import jakarta.persistence.Entity;

import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "images")
public class Image extends BaseEntity {

    private String name;

    
}
