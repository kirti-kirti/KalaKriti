package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.dto.request.CustomOrderStatusRequest;
import com.ecommerce.ecommerce_backend.dto.response.ApiResponse;
import com.ecommerce.ecommerce_backend.dto.response.CustomOrderResponse;
import com.ecommerce.ecommerce_backend.service.CustomOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/custom-orders")
@RequiredArgsConstructor
public class CustomOrderController {

    private final CustomOrderService customOrderService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<CustomOrderResponse>> create(
            @AuthenticationPrincipal UserDetails user,
            @RequestPart(required = false) MultipartFile image,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String size,
            @RequestParam(required = false) String clothType) {
        return ResponseEntity.ok(ApiResponse.success("Custom order created",
                customOrderService.create(user.getUsername(), image, description, size, clothType)));
    }

    @GetMapping
    public ResponseEntity<List<CustomOrderResponse>> getUserOrders(@AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(customOrderService.getUserOrders(user.getUsername()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomOrderResponse> getById(@PathVariable Long id,
                                                       @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(customOrderService.getById(id, user.getUsername()));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<CustomOrderResponse>> updateStatus(@PathVariable Long id,
                                                                         @Valid @RequestBody CustomOrderStatusRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Status updated",
                customOrderService.updateStatus(id, request.getStatus())));
    }
}
