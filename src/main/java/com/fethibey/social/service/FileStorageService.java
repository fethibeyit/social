package com.fethibey.social.service;

import com.fethibey.social.entity.AppFile;
import com.fethibey.social.exception.NotFoundException;
import com.fethibey.social.model.file.FileModel;
import com.fethibey.social.model.post.PostModel;
import com.fethibey.social.repository.AppFileRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;
import java.util.stream.Stream;


@Service
@AllArgsConstructor
public class FileStorageService {

    private AppFileRepository repository;
    private final ModelMapper mapper;

    public FileModel store(MultipartFile file, String url) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        AppFile appFile = repository.save( new AppFile(fileName, file.getContentType(), url, file.getBytes()));
        return mapper.map(appFile, FileModel.class);
    }

    @Transactional
    public AppFile getFile(String url) {
        AppFile file = null;
        try {
            file = repository.findByUrl(url).orElseThrow(() -> new NotFoundException());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return file;
    }

    public Stream<AppFile> getAllFiles() {
        return repository.findAll().stream();
    }

}
