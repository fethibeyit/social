package com.fethibey.social.model;

import lombok.Data;

import java.sql.Date;
import java.util.UUID;
@Data
public class BaseModel {

    protected UUID id;
    protected Date createdAt;

}
