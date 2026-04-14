package com.ecommerce.ecommerce_backend.dto.response;

import com.ecommerce.ecommerce_backend.entity.Product;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String category;
    private String imageUrl;
    private Integer stock;
    private String tags;

    public static ProductResponse from(Product p) {
        ProductResponse r = new ProductResponse();
        r.id = p.getId();
        r.name = p.getName();
        r.description = p.getDescription();
        r.price = p.getPrice();
        r.category = p.getCategory();
        r.imageUrl = p.getImageUrl();
        r.stock = p.getStock();
        r.tags = p.getTags();
        return r;
    }
}
