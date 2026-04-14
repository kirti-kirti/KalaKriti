package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.dto.request.UpdateProfileRequest;
import com.ecommerce.ecommerce_backend.dto.response.ApiResponse;
import com.ecommerce.ecommerce_backend.dto.response.UserProfileResponse;
import com.ecommerce.ecommerce_backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    /**
     * GET /api/users/me
     * Returns the currently authenticated user's profile.
     * Frontend uses this to populate the profile icon / dropdown.
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getProfile(
            @AuthenticationPrincipal UserDetails user) {
        log.debug("Profile fetch request for: {}", user.getUsername());
        return ResponseEntity.ok(
                ApiResponse.success("User fetched successfully",
                        userService.getProfile(user.getUsername())));
    }

    /**
     * PUT /api/users/me
     * Update name, phone, address, email, or password.
     */
    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponse>> updateProfile(
            @AuthenticationPrincipal UserDetails user,
            @Valid @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(
                ApiResponse.success("Profile updated successfully",
                        userService.updateProfile(user.getUsername(), request)));
    }

    /**
     * POST /api/users/logout
     * Stateless JWT logout — instructs frontend to discard the token.
     * Token blacklisting can be added here when Redis is integrated.
     */
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            @AuthenticationPrincipal UserDetails user) {
        log.info("User logged out: {}", user.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Logged out successfully"));
    }

    /**
     * GET /api/users — ADMIN only (enforced in SecurityConfig)
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<UserProfileResponse>>> getAllUsers(
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(
                ApiResponse.success("Users fetched successfully",
                        userService.getAllUsers(pageable)));
    }
}
