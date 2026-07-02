package com.example.ecommerce.EcommController;

import com.example.ecommerce.EcommDto.Responce.ApiResponse;
import com.example.ecommerce.EcommEntity.CartEntity;
import com.example.ecommerce.EcommService.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = {
    "http://localhost:4200",
    "https://aurevia-frontend-silk.vercel.app"
},
methods = {
    RequestMethod.GET,
    RequestMethod.POST,
    RequestMethod.PUT,
    RequestMethod.DELETE
})

public class CartController {

    @Autowired
    public CartService service;

    @PostMapping("/add")
    public ApiResponse<CartEntity> addtoCart(@RequestBody CartEntity cart)
    {
        return  service.addToCart(cart);
    }

    @GetMapping("/all/{userId}")
    public ApiResponse<List<CartEntity>> getCartItems(@PathVariable Long userId)
    {
        return  service.getCartItems(userId);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteCartItem(@PathVariable Long id)
    {
        return service.deleteCartItem(id);
    }

    @PutMapping("/update/{id}")
    public ApiResponse<CartEntity> updateQuantity(@PathVariable Long id, @RequestParam int quantity) {
        return service.updateQuantity(id, quantity);
    }

    @DeleteMapping("/clear/{userId}")
    public ApiResponse<String> clearCart(@PathVariable Long userId) {
        return service.clearCart(userId);
    }

}
