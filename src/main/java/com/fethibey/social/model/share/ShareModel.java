package com.fethibey.social.model.share;

import com.fethibey.social.model.BaseModel;
import lombok.Data;

import java.util.UUID;

@Data
public class ShareModel extends BaseModel {

    private UUID ownerId;
}
