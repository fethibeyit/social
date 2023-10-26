package com.fethibey.social.model.post;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class PostUpdateModel {

    @NotNull(message = "Content is required")
    @Length(min = 2, message = "Content must contain at least 2 characters")
    private String content;

}
