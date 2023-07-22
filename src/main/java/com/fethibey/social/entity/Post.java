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
    private int views = 0;
    private int likes = 0;
    private int shares =0;

//    private User author;
//    private List<Category> categories;
//    private List<string> tags;
//    private List<Comment> comments;



}
