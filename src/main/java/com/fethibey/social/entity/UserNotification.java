package com.fethibey.social.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "users_notifications")
public class UserNotification extends BaseEntity {

    @ManyToOne
    private AppUser recipient;

    @ManyToOne
    private Notification notification;

    private boolean isRead = false;
    
}
