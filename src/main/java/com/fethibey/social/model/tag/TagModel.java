package com.fethibey.social.model.tag;

import com.fethibey.social.model.BaseModel;
import lombok.Data;

import java.util.UUID;

@Data
public class TagModel extends BaseModel {

    private int position;
    private UUID userId;
    private UUID groupId;
    private UUID pageId;
}
