package com.fethibey.social.config;

import com.fethibey.social.entity.Post;
import com.fethibey.social.model.post.PostCreateModel;
import com.fethibey.social.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@AllArgsConstructor
public class MappingConfig {

    private final PostRepository postRepository;

    @Bean
    public ModelMapper getMapper(){
        var mapper = new ModelMapper();

//        TypeMap<PostCreateModel, Post> propertyMapper = mapper.createTypeMap(PostCreateModel.class, Post.class);
//        propertyMapper.addMappings(m -> m.skip(Post::setId));

        mapper.getConfiguration().setAmbiguityIgnored(true);

        return mapper;
    }

}
