package com.fethibey.social.config;

import com.fethibey.social.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@AllArgsConstructor
public class MappingConfig {

    private final PostRepository postRepository;

    @Bean
    public ModelMapper getMapper(){
        var mapper = new ModelMapper();

        return mapper;
    }

}
