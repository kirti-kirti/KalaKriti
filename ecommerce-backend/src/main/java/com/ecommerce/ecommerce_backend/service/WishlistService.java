package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.response.WishlistResponse;
import com.ecommerce.ecommerce_backend.entity.Product;
import com.ecommerce.ecommerce_backend.entity.User;
import com.ecommerce.ecommerce_backend.entity.Wishlist;
import com.ecommerce.ecommerce_backend.exception.BadRequestException;
import com.ecommerce.ecommerce_backend.exception.ResourceNotFoundException;
import com.ecommerce.ecommerce_backend.repository.ProductRepository;
import com.ecommerce.ecommerce_backend.repository.UserRepository;
import com.ecommerce.ecommerce_backend.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public WishlistResponse getWishlist(String email) {
        return WishlistResponse.from(getOrCreate(email));
    }

    public WishlistResponse addProduct(String email, Long productId) {
        Wishlist wishlist = getOrCreate(email);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + productId));

        boolean alreadyAdded = wishlist.getProducts().stream()
                .anyMatch(p -> p.getId().equals(productId));
        if (alreadyAdded) {
            throw new BadRequestException("Product already in wishlist");
        }

        wishlist.getProducts().add(product);
        log.info("Product {} added to wishlist for {}", productId, email);
        return WishlistResponse.from(wishlistRepository.save(wishlist));
    }

    public WishlistResponse removeProduct(String email, Long productId) {
        Wishlist wishlist = getOrCreate(email);
        wishlist.getProducts().removeIf(p -> p.getId().equals(productId));
        return WishlistResponse.from(wishlistRepository.save(wishlist));
    }

    private Wishlist getOrCreate(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return wishlistRepository.findByUserId(user.getId())
                .orElseGet(() -> wishlistRepository.save(Wishlist.builder().user(user).build()));
    }
}
