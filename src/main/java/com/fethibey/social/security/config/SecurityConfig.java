package com.fethibey.social.security.config;

import com.fethibey.social.security.jwt.TokenAuthenticationFilter;
import com.fethibey.social.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.fethibey.social.security.oauth2.OAuth2AccessTokenResponseConverterWithDefaults;
import com.fethibey.social.security.oauth2.OAuth2AuthenticationFailureHandler;
import com.fethibey.social.security.oauth2.OAuth2AuthenticationSuccessHandler;
import com.fethibey.social.security.service.CustomOAuth2UserService;
import com.fethibey.social.security.service.CustomOidcUserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.endpoint.DefaultAuthorizationCodeTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.http.OAuth2ErrorResponseErrorHandler;
import org.springframework.security.oauth2.core.http.converter.OAuth2AccessTokenResponseHttpMessageConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

    private CustomOAuth2UserService customOAuth2UserService;
    private CustomOidcUserService customOidcUserService;
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;


    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf-> csrf.disable())
                .sessionManagement(sm->sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(ar->ar.requestMatchers("/api/v1/**").authenticated())
                .authorizeHttpRequests(ar->ar.anyRequest().permitAll())
//                .oauth2ResourceServer(oauth2->oauth2.jwt(Customizer.withDefaults()))
                .oauth2Login(oauth2 -> {
                    oauth2.loginPage("/oauth_login");
                    oauth2.authorizationEndpoint(ae ->
                            ae.authorizationRequestRepository(cookieAuthorizationRequestRepository()));
                    oauth2.redirectionEndpoint(Customizer.withDefaults());
                    oauth2.userInfoEndpoint(ui -> {
                        ui.oidcUserService(customOidcUserService);
                        ui.userService(customOAuth2UserService);
                    });
                    oauth2.tokenEndpoint(te ->
                            te.accessTokenResponseClient(authorizationCodeTokenResponseClient()));
                    oauth2.successHandler(oAuth2AuthenticationSuccessHandler);
                    oauth2.failureHandler(oAuth2AuthenticationFailureHandler);
                })
                .addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .build();
    }




    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter();
    }

    /*
     * By default, Spring OAuth2 uses
     * HttpSessionOAuth2AuthorizationRequestRepository to save the authorization
     * request. But, since our service is stateless, we can't save it in the
     * session. We'll save the request in a Base64 encoded cookie instead.
     */
    @Bean
    public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }

    // This bean is load the user specific data when form login is used.
//    @Override
//    public UserDetailsService userDetailsService() {
//        return userDetailsService;
//    }

//    @Bean(BeanIds.AUTHENTICATION_MANAGER)
//    @Override
//    public AuthenticationManager authenticationManagerBean() throws Exception {
//        return super.authenticationManagerBean();
//    }

    private OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> authorizationCodeTokenResponseClient() {
        OAuth2AccessTokenResponseHttpMessageConverter tokenResponseHttpMessageConverter = new OAuth2AccessTokenResponseHttpMessageConverter();
        tokenResponseHttpMessageConverter.setAccessTokenResponseConverter(new OAuth2AccessTokenResponseConverterWithDefaults());
        RestTemplate restTemplate = new RestTemplate(Arrays.asList(new FormHttpMessageConverter(), tokenResponseHttpMessageConverter));
        restTemplate.setErrorHandler(new OAuth2ErrorResponseErrorHandler());
        DefaultAuthorizationCodeTokenResponseClient tokenResponseClient = new DefaultAuthorizationCodeTokenResponseClient();
        tokenResponseClient.setRestOperations(restTemplate);
        return tokenResponseClient;
    }
}