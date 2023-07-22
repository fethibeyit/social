package com.fethibey.social.entity;

import jakarta.persistence.Entity;
import lombok.Data;

import java.sql.Date;

@Entity
@Data
public class Post extends BaseEntity {

    private String title;
    private String content;
    private Date publicationDate;
    private Long views;
    private Long likes;
    private Long shares;

//    private User author;
//    private List<Category> categories;
//    private List<string> tags;
//    private List<Comment> comments;



}
