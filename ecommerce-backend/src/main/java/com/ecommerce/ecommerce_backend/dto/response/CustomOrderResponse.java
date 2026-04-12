package com.ecommerce.ecommerce_backend.dto.response;

import com.ecommerce.ecommerce_backend.entity.CustomOrder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CustomOrderResponse {
    private Long id;
    private Long userId;
    private String imageUrl;
    private String description;
    private String size;
    private String clothType;
    private String status;
    private LocalDateTime createdAt;

    public static CustomOrderResponse from(CustomOrder co) {
        CustomOrderResponse r = new CustomOrderResponse();
        r.id = co.getId();
        r.userId = co.getUser().getId();
        r.imageUrl = co.getImageUrl();
        r.description = co.getDescription();
        r.size = co.getSize();
        r.clothType = co.getClothType();
        r.status = co.getStatus().name();
        r.createdAt = co.getCreatedAt();
        return r;
    }
}
