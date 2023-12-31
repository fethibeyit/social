package com.fethibey.social.model.comment;

import com.fethibey.social.model.tag.TagModel;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
public class CommentCreateModel {

    private String content;
    private Set<TagModel> tags;
    private UUID post_id ;
    private UUID reply_id ;

}
