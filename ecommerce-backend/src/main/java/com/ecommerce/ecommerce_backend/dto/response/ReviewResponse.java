package com.ecommerce.ecommerce_backend.dto.response;

import com.ecommerce.ecommerce_backend.entity.Review;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewResponse {
    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private Long productId;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;

    public static ReviewResponse from(Review r) {
        ReviewResponse res = new ReviewResponse();
        res.id = r.getId();
        res.userId = r.getUser().getId();
        res.firstName = r.getUser().getFirstName();
        res.lastName = r.getUser().getLastName();
        res.productId = r.getProduct().getId();
        res.rating = r.getRating();
        res.comment = r.getComment();
        res.createdAt = r.getCreatedAt();
        return res;
    }
}
