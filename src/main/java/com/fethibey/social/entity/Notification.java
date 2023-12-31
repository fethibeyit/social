package com.fethibey.social.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "notifications")
public class Notification extends BaseEntity {

    private String title;
    private String content;

    @OneToMany(mappedBy = "notification")
    private List<UserNotification> recipients;
    
}
