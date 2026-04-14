package com.ecommerce.ecommerce_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "custom_orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String imageUrl;

    @Column(length = 1000)
    private String description;

    private String size;

    private String clothType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public enum Status { PENDING, APPROVED, IN_PROGRESS, COMPLETED, REJECTED, CANCELLED }
}
