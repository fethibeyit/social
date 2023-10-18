package com.fethibey.social.model.tag;

import lombok.Data;

import java.util.UUID;

@Data
public class TagCreateModel {

    private int position;
    private UUID user_id ;
    private UUID groupId;
    private UUID pageId;

}
