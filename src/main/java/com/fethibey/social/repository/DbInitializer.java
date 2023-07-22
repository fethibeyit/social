package com.fethibey.social.repository;

import com.fethibey.social.entity.Post;
import com.github.javafaker.Faker;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

@Component
@AllArgsConstructor
public class DbInitializer implements CommandLineRunner {

    private PostRepository postRepository;
    @Override
    public void run(String... args) throws Exception {

        Faker faker = new Faker();
        var random = ThreadLocalRandom.current();

        postRepository.deleteAll();

        for (int i = 0; i < 10; i++) {
            var post = new Post();
            post.setTitle(faker.book().title());
            post.setContent(faker.lorem().paragraph());
            post.setViews(random.nextInt(0,100));
            post.setLikes(random.nextInt(0,50));
            post.setShares(random.nextInt(0,10));
            post.setPublicationDate(new Date(faker.date().past(10, TimeUnit.DAYS).toInstant().toEpochMilli()));
            postRepository.save(post);
        }

    }
}
