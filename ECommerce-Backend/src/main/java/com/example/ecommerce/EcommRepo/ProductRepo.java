package com.example.ecommerce.EcommRepo;

import com.example.ecommerce.EcommEntity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<ProductEntity,Long> {

}
