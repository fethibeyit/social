package com.fethibey.social.model.comment;

import com.fethibey.social.model.BaseModel;
import com.fethibey.social.model.like.LikeModel;
import com.fethibey.social.model.tag.TagModel;
import com.fethibey.social.model.user.AppUserModel;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
public class CommentModel extends BaseModel {

    private String content;
    private UUID authorId;
    private AppUserModel author;
    private Set<LikeModel> likes;
    private Set<TagModel> tags;
    private Set<CommentModel> replies;
    private UUID post_id ;
    private UUID reply_id ;

}
