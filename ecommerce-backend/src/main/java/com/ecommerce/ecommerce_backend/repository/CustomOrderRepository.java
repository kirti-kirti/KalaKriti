package com.ecommerce.ecommerce_backend.repository;

import com.ecommerce.ecommerce_backend.entity.CustomOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomOrderRepository extends JpaRepository<CustomOrder, Long> {
    List<CustomOrder> findByUserIdOrderByCreatedAtDesc(Long userId);
    Page<CustomOrder> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
