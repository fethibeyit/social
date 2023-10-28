package com.fethibey.social.model.post;

import com.fethibey.social.model.file.FileCreateModel;
import com.fethibey.social.model.file.FileModel;
import com.fethibey.social.model.tag.TagCreateModel;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
public class PostCreateModel {

    @NotNull(message = "Content is required")
    @Length(min = 2, message = "Content must contain at least 2 characters")
    private String content;

    private List<FileCreateModel> files;

    private Set<TagCreateModel> tags;

    private UUID groupId;
    private UUID pageId;

}
