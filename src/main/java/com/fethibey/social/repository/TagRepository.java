package com.fethibey.social.repository;

import com.fethibey.social.entity.Post;
import com.fethibey.social.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TagRepository extends JpaRepository<Tag, UUID> {

    Page<Tag> findAll(Pageable pageable);
}
