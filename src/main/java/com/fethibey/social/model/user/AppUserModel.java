package com.fethibey.social.model.user;
import com.fethibey.social.model.BaseModel;
import lombok.Data;

@Data
public class AppUserModel extends BaseModel {

    private String firstName;
    private String lastName;

    private String name;
    private String email;
}
