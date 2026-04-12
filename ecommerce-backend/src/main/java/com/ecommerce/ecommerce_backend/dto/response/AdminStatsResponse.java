package com.ecommerce.ecommerce_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class AdminStatsResponse {
    private long totalUsers;
    private long totalOrders;
    private long totalProducts;
    private BigDecimal totalRevenue;
}
