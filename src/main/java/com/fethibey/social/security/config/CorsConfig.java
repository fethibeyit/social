package com.fethibey.social.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("localhost:4200")
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowCredentials(true);
            }
        };
    }

//    @Bean
//    CorsFilter corsFilter() {
//        CorsConfiguration corsConfiguration =
//                new CorsConfiguration();
//        corsConfiguration.setAllowCredentials(true);
//        corsConfiguration.setAllowedOrigins(
//                Arrays.asList("http://localhost:4200"));
//        corsConfiguration.setAllowedHeaders(
//                Arrays.asList(
//                        "Origin",
//                        "Access-Control-Allow-Origin",
//                        "Content-Type",
//                        "Accept",
//                        "Authorization",
//                        "Origin, Accept",
//                        "X-Requested-With",
//                        "Access-Control-Request-Method",
//                        "Access-Control-Request-Headers"
//                )
//        );
//
//        corsConfiguration.setExposedHeaders(
//                Arrays.asList(
//                        "Origin",
//                        "Content-Type",
//                        "Accept",
//                        "Authorization",
//                        "Access-Control-Allow-Origin",
//                        "Access-Control-Allow-Origin",
//                        "Access-Control-Allow-Credentials"
//                )
//        );
//        corsConfiguration.setAllowedMethods(
//                Arrays.asList("GET", "POST", "PUT", "DELETE","OPTIONS")
//        );
//        var urlBasedCorsConfigurationSource =
//                new UrlBasedCorsConfigurationSource();
//        urlBasedCorsConfigurationSource.registerCorsConfiguration(
//                "/**",
//                corsConfiguration
//        );
//        return new CorsFilter(urlBasedCorsConfigurationSource);
//    }

}
