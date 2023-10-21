package com.fethibey.social.entity;

import jakarta.persistence.Entity;

import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor @AllArgsConstructor
@Table(name = "files")
public class AppFile extends BaseEntity {

    private String name;
    private String type;

    @Lob
    private byte[] data;
    
}
