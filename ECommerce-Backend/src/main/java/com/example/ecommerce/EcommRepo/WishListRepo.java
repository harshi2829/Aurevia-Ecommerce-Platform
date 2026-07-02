package com.example.ecommerce.EcommRepo;

import com.example.ecommerce.EcommEntity.WishListEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishListRepo extends JpaRepository<WishListEntity,Long> {
    List<WishListEntity> findByUserId(Long userId);
    List<WishListEntity> findByProductIdAndUserId(Long productId,Long userId);
}
