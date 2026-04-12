package com.ecommerce.ecommerce_backend.dto.request;

import com.ecommerce.ecommerce_backend.entity.Order;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderStatusRequest {
    @NotNull
    private Order.Status status;
}
