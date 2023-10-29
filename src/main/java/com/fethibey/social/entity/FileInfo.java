package com.fethibey.social.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor @AllArgsConstructor
@Table(name = "files_infos")
public class FileInfo extends BaseEntity {

    private String name;
    private String type;
    private String url;

//    @ManyToOne
//    @JoinColumn(name = "post_id", insertable = false, updatable = false)
//    private Post post;
    private UUID post_id ;

//    @ManyToOne
//    @JoinColumn(name = "message_id", insertable = false, updatable = false)
//    private Message message;
    private UUID message_id ;
    
}
