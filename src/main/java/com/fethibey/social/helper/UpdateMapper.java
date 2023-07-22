package com.fethibey.social.helper;

import java.lang.reflect.Field;

public class UpdateMapper {

    public static <T,U> U map  (T source, U destination) {
        Field[] fields = source.getClass().getDeclaredFields();
        for (Field sourceField : fields) {
            try{
                sourceField.setAccessible(true);
                Field destinationField = destination.getClass().getDeclaredField(sourceField.getName());
                destinationField.setAccessible(true);
                Object value = sourceField.get(source);
                destinationField.set(destination, value);
            }catch(Exception ex){}
        }
        return destination;
    }

}
