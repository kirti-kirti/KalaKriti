package com.ecommerce.ecommerce_backend.dto.response;

import com.ecommerce.ecommerce_backend.entity.User;
import lombok.Data;

@Data
public class UserProfileResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String role;

    public static UserProfileResponse from(User u) {
        UserProfileResponse r = new UserProfileResponse();
        r.id = u.getId();
        r.firstName = u.getFirstName();
        r.lastName = u.getLastName();
        r.email = u.getEmail();
        r.phone = u.getPhone();
        r.address = u.getAddress();
        r.role = u.getRole().name();
        return r;
    }
}
