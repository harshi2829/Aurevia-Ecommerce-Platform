package com.example.ecommerce.EcommRepo;

import com.example.ecommerce.EcommEntity.CartEntity;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepo extends JpaRepository<CartEntity,Long> {
    List<CartEntity> findByProductId(Long productId);
    List<CartEntity> findByUserId(Long userId);
    List<CartEntity> findByProductIdAndUserId(
            Long productId,
            Long userId
    );

}
