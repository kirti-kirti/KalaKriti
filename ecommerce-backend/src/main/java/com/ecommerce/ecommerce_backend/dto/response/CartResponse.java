package com.ecommerce.ecommerce_backend.dto.response;

import com.ecommerce.ecommerce_backend.entity.Cart;
import com.ecommerce.ecommerce_backend.entity.CartItem;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class CartResponse {
    private Long cartId;
    private List<CartItemResponse> items;
    private BigDecimal total;

    @Data
    public static class CartItemResponse {
        private Long cartItemId;
        private Long productId;
        private String productName;
        private String imageUrl;
        private BigDecimal price;
        private Integer quantity;
        private BigDecimal subtotal;
    }

    public static CartResponse from(Cart cart) {
        CartResponse r = new CartResponse();
        r.cartId = cart.getId();
        r.items = cart.getItems().stream().map(CartResponse::mapItem).toList();
        r.total = r.items.stream()
                .map(CartItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return r;
    }

    private static CartItemResponse mapItem(CartItem ci) {
        CartItemResponse i = new CartItemResponse();
        i.cartItemId = ci.getId();
        i.productId = ci.getProduct().getId();
        i.productName = ci.getProduct().getName();
        i.imageUrl = ci.getProduct().getImageUrl();
        i.price = ci.getProduct().getPrice();
        i.quantity = ci.getQuantity();
        i.subtotal = ci.getProduct().getPrice().multiply(BigDecimal.valueOf(ci.getQuantity()));
        return i;
    }
}
