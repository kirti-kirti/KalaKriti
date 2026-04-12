package com.ecommerce.ecommerce_backend.dto.response;

import com.ecommerce.ecommerce_backend.entity.Order;
import com.ecommerce.ecommerce_backend.entity.OrderItem;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponse {
    private Long id;
    private List<OrderItemResponse> items;
    private BigDecimal totalAmount;
    private String status;
    private LocalDateTime createdAt;

    @Data
    public static class OrderItemResponse {
        private Long productId;
        private String productName;
        private Integer quantity;
        private BigDecimal price;
    }

    public static OrderResponse from(Order o) {
        OrderResponse r = new OrderResponse();
        r.id = o.getId();
        r.totalAmount = o.getTotalAmount();
        r.status = o.getStatus().name();
        r.createdAt = o.getCreatedAt();
        r.items = o.getItems().stream().map(OrderResponse::mapItem).toList();
        return r;
    }

    private static OrderItemResponse mapItem(OrderItem oi) {
        OrderItemResponse i = new OrderItemResponse();
        i.productId = oi.getProduct().getId();
        i.productName = oi.getProduct().getName();
        i.quantity = oi.getQuantity();
        i.price = oi.getPrice();
        return i;
    }
}
