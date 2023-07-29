package com.fethibey.social.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
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

    @ManyToOne
    private AppUser author;
//    private List<Category> categories;
//    private List<string> tags;
//    private List<Comment> comments;



}
