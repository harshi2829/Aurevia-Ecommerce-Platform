package com.example.ecommerce.EcommService;

import com.example.ecommerce.EcommDto.Responce.ApiResponse;
import com.example.ecommerce.EcommEntity.CartEntity;
import com.example.ecommerce.EcommRepo.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CartService {

    @Autowired
    public CartRepo repo;

    public ApiResponse<CartEntity> addToCart(CartEntity cart) {
        List<CartEntity> existingList =
                repo.findByProductIdAndUserId(
                        cart.getProductId(),
                        cart.getUserId()
                );

        if (!existingList.isEmpty()) {
            CartEntity existing = existingList.get(0);
            existing.setQuantity(existing.getQuantity() + 1);
            CartEntity updated = repo.save(existing);
            return new ApiResponse<>(true, "Product Added To Cart", updated);
        }

        CartEntity saved = repo.save(cart);
        return new ApiResponse<>(true, "Product Added To Cart", saved);
    }

    public ApiResponse<List<CartEntity>> getCartItems(Long userId) {
        List<CartEntity> items = repo.findByUserId(userId);
        return new ApiResponse<>(true, "Cart Items Fetched Successfully", items);
    }

    public ApiResponse<String> deleteCartItem(Long id) {
        if (!repo.existsById(id)) {
            return new ApiResponse<>(false, "Cart Item Not Found", null);
        }
        repo.deleteById(id);
        return new ApiResponse<>(true, "Cart Item Deleted Successfully", "Deleted ID:" + id);
    }

    public ApiResponse<CartEntity> updateQuantity(Long id, int quantity) {
        CartEntity item = repo.findById(id).orElse(null);
        if (item == null) {
            return new ApiResponse<>(false, "Cart Item Not Found", null);
        }
        item.setQuantity(quantity);
        CartEntity updated = repo.save(item);
        return new ApiResponse<>(true, "Quantity Updated", updated);
    }

    public ApiResponse<String> clearCart(Long userId) {
        List<CartEntity>userCart=repo.findByUserId(userId);
        repo.deleteAll(userCart);
        return new ApiResponse<>(true, "Cart Cleared Successfully", null);
    }
}