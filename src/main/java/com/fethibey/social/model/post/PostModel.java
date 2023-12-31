package com.fethibey.social.model.post;

import com.fethibey.social.model.BaseModel;
import com.fethibey.social.model.comment.CommentModel;
import com.fethibey.social.model.file.FileModel;
import com.fethibey.social.model.like.LikeModel;
import com.fethibey.social.model.share.ShareModel;
import com.fethibey.social.model.tag.TagModel;
import com.fethibey.social.model.user.AppUserModel;
import lombok.Data;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
public class PostModel extends BaseModel {

    private String content;
    private Set<FileModel> files;
    private Set<LikeModel> likes;
    private Set<TagModel> tags;
    private Set<ShareModel> shares;
    private List<CommentModel> comments;
    private AppUserModel author;
    private UUID groupId;
    private UUID pageId;

}
