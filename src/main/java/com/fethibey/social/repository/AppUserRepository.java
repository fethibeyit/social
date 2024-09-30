package com.fethibey.social.repository;

import com.fethibey.social.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, UUID> {

    AppUser findByEmail(String email);
    AppUser findByProviderId(String providerId);

    boolean existsByEmail(String email);
    boolean existsByProviderId(String providerId);

}
