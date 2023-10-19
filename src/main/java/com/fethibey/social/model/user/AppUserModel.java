package com.fethibey.social.model.user;
import com.fethibey.social.enums.LikeType;
import com.fethibey.social.model.BaseModel;
import lombok.Data;

import java.util.UUID;

@Data
public class AppUserModel extends BaseModel {

    private String firstName;
    private String lastName;

}
