package com.fethibey.social.model;

import lombok.Data;

import java.sql.Date;
import java.util.UUID;

@Data
public class PostModel {

    private UUID id;
    private String title;
    private String content;
    private Date publicationDate;
    private Long views;
    private Long likes;
    private Long shares;
}
