package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.dto.request.CustomOrderStatusRequest;
import com.ecommerce.ecommerce_backend.dto.request.OrderStatusRequest;
import com.ecommerce.ecommerce_backend.dto.response.*;
import com.ecommerce.ecommerce_backend.service.AdminService;
import com.ecommerce.ecommerce_backend.service.CustomOrderService;
import com.ecommerce.ecommerce_backend.service.OrderService;
import com.ecommerce.ecommerce_backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final UserService userService;
    private final OrderService orderService;
    private final CustomOrderService customOrderService;

    // ── Dashboard ──────────────────────────────────────────────
    @GetMapping("/stats")
    public ResponseEntity<AdminStatsResponse> getStats() {
        return ResponseEntity.ok(adminService.getStats());
    }

    // ── Users ──────────────────────────────────────────────────
    @GetMapping("/users")
    public ResponseEntity<Page<UserProfileResponse>> getAllUsers(
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(userService.getAllUsers(pageable));
    }

    // ── Orders ─────────────────────────────────────────────────
    @GetMapping("/orders")
    public ResponseEntity<Page<OrderResponse>> getAllOrders(
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(adminService.getAllOrders(pageable));
    }

    @PutMapping("/orders/{id}/status")
    public ResponseEntity<ApiResponse<OrderResponse>> updateOrderStatus(
            @PathVariable Long id,
            @Valid @RequestBody OrderStatusRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Order status updated",
                orderService.updateStatus(id, request.getStatus())));
    }

    // ── Custom Orders ──────────────────────────────────────────
    @GetMapping("/custom-orders")
    public ResponseEntity<Page<CustomOrderResponse>> getAllCustomOrders(
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(adminService.getAllCustomOrders(pageable));
    }

    @PutMapping("/custom-orders/{id}/status")
    public ResponseEntity<ApiResponse<CustomOrderResponse>> updateCustomOrderStatus(
            @PathVariable Long id,
            @Valid @RequestBody CustomOrderStatusRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Custom order status updated",
                customOrderService.updateStatus(id, request.getStatus())));
    }
}
