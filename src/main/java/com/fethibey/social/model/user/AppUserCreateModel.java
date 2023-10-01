package com.fethibey.social.model.user;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class AppUserCreateModel {

    @NotNull(message = "Fullname is required")
    @Length(min = 2, max = 50, message = "Fullname must contain at least 2 characters and a maximum of 50 characters")
    private String fullname;

    @NotNull(message = "Email is required")
    @Email(message = "Email must contain a valid email")
    private String email;

    @NotNull(message = "Password is required")
    @Length(min = 6, max = 50, message = "Password must contain at least 6 characters and a maximum of 50 characters")
    private String password;

}
