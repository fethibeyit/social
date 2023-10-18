package com.fethibey.social.config;

import com.fethibey.social.entity.Post;
import com.fethibey.social.entity.Tag;
import com.fethibey.social.model.post.PostCreateModel;
import com.fethibey.social.model.tag.TagCreateModel;
import com.fethibey.social.repository.AppUserRepository;
import com.fethibey.social.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@AllArgsConstructor
public class MappingConfig {


    @Bean
    public ModelMapper getMapper(){
        var mapper = new ModelMapper();

        mapper.getConfiguration().setAmbiguityIgnored(true);

//        TypeMap<TagCreateModel, Tag> tagPropertyMapper = mapper.createTypeMap(TagCreateModel.class, Tag.class);
//        tagPropertyMapper.addMappings(m -> m.map(src -> {
//            if(src.getUser_id() != null){
//                return userRepository.findById(src.getUser_id());
//            }
//            return null;
//        } , Tag::setUser));

//        TypeMap<PostCreateModel, Post> propertyMapper = mapper.createTypeMap(PostCreateModel.class, Post.class);
//        propertyMapper.addMappings(m -> m.skip(Post::setId));


        return mapper;
    }


}
