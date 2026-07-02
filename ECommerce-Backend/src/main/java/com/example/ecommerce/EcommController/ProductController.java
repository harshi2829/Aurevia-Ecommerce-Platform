package com.example.ecommerce.EcommController;

import com.example.ecommerce.EcommDto.Responce.ApiResponse;
import com.example.ecommerce.EcommEntity.ProductEntity;
import com.example.ecommerce.EcommRepo.ProductRepo;
import com.example.ecommerce.EcommService.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    public ProductService service;

    @PostMapping("/add")
    public ApiResponse<ProductEntity> addProduct( @RequestBody ProductEntity product)
    {
        return service.addProduct(product);
    }

    @GetMapping("/all")
    public ApiResponse<List<ProductEntity>> getAllProducts()
    {
        return service.getAllProducts();
    }

    @GetMapping("/{id}")
    public ApiResponse<ProductEntity> getProductById(@PathVariable Long id)
    {
        return service.getProductById(id);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>deleteProduct(@PathVariable Long id)
    {
     return service.deleteProduct(id);
    }
}
