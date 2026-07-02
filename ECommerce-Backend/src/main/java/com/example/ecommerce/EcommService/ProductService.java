package com.example.ecommerce.EcommService;

import com.example.ecommerce.EcommDto.Responce.ApiResponse;
import com.example.ecommerce.EcommEntity.ProductEntity;
import com.example.ecommerce.EcommRepo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    public ProductRepo repo;

    public ApiResponse<ProductEntity> addProduct(ProductEntity product)
    {
        ProductEntity saved=repo.save(product);
        return new ApiResponse<>(true,"Product Added Successfully",saved);
    }

    public ApiResponse<List<ProductEntity>> getAllProducts()
    {
        List<ProductEntity> list=repo.findAll();
        return new ApiResponse<>(true,"Products fetched successfully",list);
    }

    public ApiResponse<ProductEntity> getProductById(Long id)
    {
        ProductEntity product=repo.findById(id).orElse(null);

        if(product==null)
        {
            return new ApiResponse<>(false,"Product not found",null);
        }
        return new ApiResponse<>(true,"Product found",product);
    }

    public ApiResponse<String> deleteProduct(Long id)
    {
        if(!repo.existsById(id))
        {
            return new ApiResponse<>(false,"Product Not Found",null);
        }
        repo.deleteById(id);
        return new ApiResponse<>(true,"Product Deleted Successfully","Deleted ID:"+id);
    }
}
