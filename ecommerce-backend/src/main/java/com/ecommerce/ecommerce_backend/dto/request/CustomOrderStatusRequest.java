package com.ecommerce.ecommerce_backend.dto.request;

import com.ecommerce.ecommerce_backend.entity.CustomOrder;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CustomOrderStatusRequest {
    @NotNull
    private CustomOrder.Status status;
}
