package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.dto.response.ApiResponse;
import com.ecommerce.ecommerce_backend.dto.response.WishlistResponse;
import com.ecommerce.ecommerce_backend.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<WishlistResponse> getWishlist(@AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(wishlistService.getWishlist(user.getUsername()));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<ApiResponse<WishlistResponse>> addProduct(
            @AuthenticationPrincipal UserDetails user,
            @PathVariable Long productId) {
        return ResponseEntity.ok(ApiResponse.success("Added to wishlist",
                wishlistService.addProduct(user.getUsername(), productId)));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse<WishlistResponse>> removeProduct(
            @AuthenticationPrincipal UserDetails user,
            @PathVariable Long productId) {
        return ResponseEntity.ok(ApiResponse.success("Removed from wishlist",
                wishlistService.removeProduct(user.getUsername(), productId)));
    }
}
