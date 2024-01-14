package com.fethibey.social.controller;

import com.fethibey.social.model.user.AppUserModel;
import com.fethibey.social.service.AppUserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/appUsers")
public class AppUserController {

    private final AppUserService service;

    @GetMapping
    public ResponseEntity<List<AppUserModel>> getAllAppUser(){
        return new ResponseEntity(service.getAllAppUser(), HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity<List<AppUserModel>> getAllAppUserPageable(@RequestParam(defaultValue = "1")  int page,
//                                                              @RequestParam(defaultValue = "5")  int size){
//        Pageable paging = PageRequest.of(page-1, size);
//        return new ResponseEntity(service.getAllAppUsersPageable(paging), HttpStatus.OK);
//    }

    @GetMapping("/{id}")
    public ResponseEntity<AppUserModel> getById(@PathVariable UUID id){
        return new ResponseEntity(service.getById(id), HttpStatus.OK);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<AppUserModel> updateAppUser(@PathVariable UUID id, @Valid @RequestBody AppUserUpdateModel model) {
//        return new ResponseEntity(service.updateAppUser(id, model),HttpStatus.OK);
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteAppUser(@PathVariable UUID id){
        service.deleteAppUser(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
