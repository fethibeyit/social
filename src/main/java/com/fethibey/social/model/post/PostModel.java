package com.fethibey.social.model.post;

import com.fethibey.social.model.BaseModel;
import com.fethibey.social.model.cooment.CommentModel;
import com.fethibey.social.model.like.LikeModel;
import com.fethibey.social.model.share.ShareModel;
import com.fethibey.social.model.tag.TagModel;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
public class PostModel extends BaseModel {

    private String title;
    private String content;
    private Set<LikeModel> likes;
    private Set<TagModel> tags;
    private Set<ShareModel> shares;
    private Set<CommentModel> comments;
    private UUID authorId;
    private UUID groupId;
    private UUID pageId;

}
