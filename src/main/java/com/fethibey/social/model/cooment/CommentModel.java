package com.fethibey.social.model.cooment;

import com.fethibey.social.model.BaseModel;
import com.fethibey.social.model.like.LikeModel;
import com.fethibey.social.model.tag.TagModel;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
public class CommentModel extends BaseModel {

    private String content;
    private UUID authorId;
    private Set<LikeModel> likes;
    private Set<TagModel> tags;
    private Set<CommentModel> replies;

}
