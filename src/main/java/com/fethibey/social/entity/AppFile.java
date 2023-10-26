package com.fethibey.social.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

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
