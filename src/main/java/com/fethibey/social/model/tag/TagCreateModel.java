package com.fethibey.social.model.tag;

import lombok.Data;

import java.util.UUID;

@Data
public class TagCreateModel {

    private int position;
    private UUID userId;
    private UUID groupId;
    private UUID pageId;

}
