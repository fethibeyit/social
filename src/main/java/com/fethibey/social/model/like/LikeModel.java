package com.fethibey.social.model.like;
import com.fethibey.social.enums.LikeType;
import com.fethibey.social.model.BaseModel;
import com.fethibey.social.model.user.AppUserModel;
import lombok.Data;

import java.util.UUID;

@Data
public class LikeModel extends BaseModel {

    private LikeType type;
    private AppUserModel owner;

    private UUID post_id ;
    private UUID comment_id ;
    private UUID message_id ;

}
