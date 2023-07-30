package com.fethibey.social.repository;

import com.fethibey.social.entity.AppUser;
import com.fethibey.social.entity.Post;
import com.github.javafaker.Faker;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

@Component
@AllArgsConstructor
public class DbInitializer implements CommandLineRunner {

    private PostRepository postRepository;
    private AppUserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    @Override
    public void run(String... args) throws Exception {

        Faker faker = new Faker();
        var random = ThreadLocalRandom.current();

        postRepository.deleteAll();
        userRepository.deleteAll();

        var user = new AppUser();
        user.setFirstName("Jean");
        user.setLastName("Tremblay");
        user.setUsername("admin");
        user.setPassword(passwordEncoder.encode("pass"));

        userRepository.save(user);

        for (int i = 0; i < 10; i++) {
            var post = new Post();
            post.setTitle(faker.book().title());
            post.setContent(faker.lorem().paragraph());
            post.setViews(random.nextInt(0,100));
            post.setLikes(random.nextInt(0,50));
            post.setShares(random.nextInt(0,10));
            post.setPublicationDate(new Date(faker.date().past(10, TimeUnit.DAYS).toInstant().toEpochMilli()));
            post.setAuthor(user);
            postRepository.save(post);
        }

    }
}