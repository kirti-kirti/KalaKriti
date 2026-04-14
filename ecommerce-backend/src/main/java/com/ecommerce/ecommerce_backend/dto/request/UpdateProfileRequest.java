package com.ecommerce.ecommerce_backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateProfileRequest {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private String phone;

    private String address;

    @Email
    private String email;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}
