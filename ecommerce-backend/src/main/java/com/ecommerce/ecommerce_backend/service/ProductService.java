package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.request.ProductRequest;
import com.ecommerce.ecommerce_backend.dto.response.ProductResponse;
import com.ecommerce.ecommerce_backend.entity.Product;
import com.ecommerce.ecommerce_backend.exception.ResourceNotFoundException;
import com.ecommerce.ecommerce_backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    public Page<ProductResponse> getAll(String keyword, String category,
                                        BigDecimal minPrice, BigDecimal maxPrice,
                                        Pageable pageable) {
        return productRepository.filter(
                blankToNull(keyword), blankToNull(category), minPrice, maxPrice, pageable
        ).map(ProductResponse::from);
    }

    public ProductResponse getById(Long id) {
        return ProductResponse.from(findOrThrow(id));
    }

    public ProductResponse create(ProductRequest request) {
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(request.getCategory())
                .imageUrl(request.getImageUrl())
                .stock(request.getStock())
                .tags(request.getTags())
                .build();
        log.info("Product created: {}", request.getName());
        return ProductResponse.from(productRepository.save(product));
    }

    public ProductResponse update(Long id, ProductRequest request) {
        Product product = findOrThrow(id);
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setImageUrl(request.getImageUrl());
        product.setStock(request.getStock());
        product.setTags(request.getTags());
        return ProductResponse.from(productRepository.save(product));
    }

    public void delete(Long id) {
        productRepository.delete(findOrThrow(id));
        log.info("Product deleted: {}", id);
    }

    private Product findOrThrow(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
    }

    private String blankToNull(String s) {
        return (s == null || s.isBlank()) ? null : s;
    }
}
