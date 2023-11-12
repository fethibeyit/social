package com.fethibey.social.model.like;

import com.fethibey.social.entity.AppUser;
import com.fethibey.social.enums.LikeType;
import com.fethibey.social.model.file.FileCreateModel;
import com.fethibey.social.model.tag.TagCreateModel;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
public class LikeCreateModel {

    @NotNull(message = "Content is required")
    private LikeType type;

    private UUID post_id ;
    private UUID comment_id ;
    private UUID message_id ;

}
