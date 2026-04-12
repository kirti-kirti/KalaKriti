package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.response.CustomOrderResponse;
import com.ecommerce.ecommerce_backend.entity.CustomOrder;
import com.ecommerce.ecommerce_backend.entity.User;
import com.ecommerce.ecommerce_backend.exception.BadRequestException;
import com.ecommerce.ecommerce_backend.exception.ResourceNotFoundException;
import com.ecommerce.ecommerce_backend.repository.CustomOrderRepository;
import com.ecommerce.ecommerce_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CustomOrderService {

    private static final Set<String> ALLOWED_TYPES = Set.of("image/jpeg", "image/png", "image/webp");

    private final CustomOrderRepository customOrderRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public CustomOrderResponse create(String email, MultipartFile image,
                                      String description, String size, String clothType) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            if (!ALLOWED_TYPES.contains(image.getContentType())) {
                throw new BadRequestException("Only JPEG, PNG, and WEBP images are allowed");
            }
            imageUrl = fileStorageService.store(image);
        }

        CustomOrder order = CustomOrder.builder()
                .user(user)
                .imageUrl(imageUrl)
                .description(description)
                .size(size)
                .clothType(clothType)
                .status(CustomOrder.Status.PENDING)
                .build();

        log.info("Custom order created for user: {}", email);
        return CustomOrderResponse.from(customOrderRepository.save(order));
    }

    public List<CustomOrderResponse> getUserOrders(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return customOrderRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream().map(CustomOrderResponse::from).toList();
    }

    public CustomOrderResponse getById(Long id, String email) {
        CustomOrder order = customOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Custom order not found: " + id));
        if (!order.getUser().getEmail().equals(email)) {
            throw new ResourceNotFoundException("Custom order not found: " + id);
        }
        return CustomOrderResponse.from(order);
    }

    public CustomOrderResponse updateStatus(Long id, CustomOrder.Status status) {
        CustomOrder order = customOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Custom order not found: " + id));
        order.setStatus(status);
        log.info("Custom order {} status updated to {}", id, status);
        return CustomOrderResponse.from(customOrderRepository.save(order));
    }
}
