package com.fethibey.social.model.post;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class PostUpdateModel {

    @NotEmpty(message = "Title is required")
    @Length(min = 2, max = 50, message = "Title must contain at least 2 characters and a maximum of 50 characters")
    private String title;

    @NotEmpty(message = "Content is required")
    @Length(min = 2, message = "Content must contain at least 2 characters")
    private String content;

}
