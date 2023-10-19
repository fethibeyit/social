package com.fethibey.social.model.tag;

import com.fethibey.social.model.BaseModel;
import com.fethibey.social.model.user.AppUserModel;
import lombok.Data;

import java.util.UUID;

@Data
public class TagModel extends BaseModel {

    private int position;
    private AppUserModel user;
    private UUID groupId;
    private UUID pageId;
}
