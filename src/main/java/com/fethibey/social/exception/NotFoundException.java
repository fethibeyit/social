package com.fethibey.social.exception;

import java.util.UUID;

public class NotFoundException extends RuntimeException {

    public NotFoundException(){
        super();
    }

    public NotFoundException(UUID id){
        super("Element by id " + id + " was not found");
    }

}
