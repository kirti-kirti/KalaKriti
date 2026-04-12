package com.ecommerce.ecommerce_backend.dto.response;

import com.ecommerce.ecommerce_backend.entity.Wishlist;
import lombok.Data;
import java.util.List;

@Data
public class WishlistResponse {
    private Long wishlistId;
    private List<ProductResponse> products;

    public static WishlistResponse from(Wishlist w) {
        WishlistResponse r = new WishlistResponse();
        r.wishlistId = w.getId();
        r.products = w.getProducts().stream().map(ProductResponse::from).toList();
        return r;
    }
}
