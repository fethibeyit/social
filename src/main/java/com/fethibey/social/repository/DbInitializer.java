package com.fethibey.social.repository;

import com.fethibey.social.entity.AppRole;
import com.fethibey.social.entity.AppUser;
import com.fethibey.social.entity.Post;
import com.github.javafaker.Faker;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

@Component
@AllArgsConstructor
public class DbInitializer implements CommandLineRunner {

    private PostRepository postRepository;
    private AppUserRepository userRepository;
    private AppRoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    @Override
    public void run(String... args) throws Exception {

        Faker faker = new Faker();
        var random = ThreadLocalRandom.current();

        if(userRepository.count() > 0 ) return;

        postRepository.deleteAll();
        userRepository.deleteAll();
        roleRepository.deleteAll();

        var adminRole = new AppRole();
        adminRole.setName(AppRole.ROLE_ADMIN);
        roleRepository.save(adminRole);

        var userRole = new AppRole();
        userRole.setName(AppRole.ROLE_USER);
        roleRepository.save(userRole);

        var user = new AppUser();
        user.setFirstName("Alicia");
        user.setLastName("Beaudry");
        user.setEmail("user@test.com");
        user.setPassword(passwordEncoder.encode("123456"));
        var userRoles = new HashSet<AppRole>();
        userRoles.add(userRole);
        user.setRoles(userRoles);
        userRepository.save(user);

        var admin = new AppUser();
        user.setFirstName("Jean");
        user.setLastName("Tremblay");
        admin.setEmail("admin@test.com");
        admin.setPassword(passwordEncoder.encode("123456"));
        var adminUserRoles = new HashSet<AppRole>();
        adminUserRoles.add(adminRole);
        adminUserRoles.add(userRole);
        admin.setRoles(adminUserRoles);
        userRepository.save(admin);

//        for (int i = 0; i < 3; i++) {
            var post = new Post();
            post.setContent("user " + faker.lorem().paragraph());
            post.setAuthor(user);
            postRepository.save(post);
//        }

//        for (int i = 0; i < 3; i++) {
            var post2 = new Post();
            post2.setContent("admin " + faker.lorem().paragraph());
            post2.setAuthor(admin);
            postRepository.save(post2);
//        }

    }
}
