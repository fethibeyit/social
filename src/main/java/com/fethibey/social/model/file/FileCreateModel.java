package com.fethibey.social.model.file;

import com.fethibey.social.model.BaseModel;
import lombok.Data;

@Data
public class FileCreateModel {

    private String name;
    private String type;
    private String url;

}
