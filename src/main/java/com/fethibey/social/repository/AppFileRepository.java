package com.fethibey.social.repository;

import com.fethibey.social.entity.AppFile;
import com.fethibey.social.entity.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AppFileRepository extends JpaRepository<AppFile, UUID> {


}
