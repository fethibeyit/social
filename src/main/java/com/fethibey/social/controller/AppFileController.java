package com.fethibey.social.controller;

import com.fethibey.social.entity.AppFile;
import com.fethibey.social.exception.NotFoundException;
import com.fethibey.social.model.file.FileModel;
import com.fethibey.social.service.FileStorageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/files")
public class AppFileController {

    private final FileStorageService storageService;

    @PostMapping("/upload")
    public ResponseEntity<FileModel> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("url") String url) {
        try {
            return new ResponseEntity(storageService.store(file , url), HttpStatus.OK);
        } catch (Exception e) {
            throw new NotFoundException();
        }
    }

    @GetMapping("/{url}")
    public ResponseEntity<byte[]> getFile(@PathVariable String url) {
        AppFile file = storageService.getFile(url);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(file.getData());
    }

}
