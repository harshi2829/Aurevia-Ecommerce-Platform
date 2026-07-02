package com.example.ecommerce.EcommController;

import com.example.ecommerce.EcommDto.Responce.ApiResponse;
import com.example.ecommerce.EcommEntity.WishListEntity;
import com.example.ecommerce.EcommService.WishListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin(origins = "http://localhost:4200")
public class WishListController {

    @Autowired
    public WishListService service;

    @PostMapping("/add")
    public ApiResponse<WishListEntity> addToWishList(@RequestBody WishListEntity wishList)
    {
        return service.addToWishList(wishList);
    }

    @GetMapping("/all/{userId}")
    public ApiResponse<List<WishListEntity>> getWishListItems(@PathVariable  Long userId)
    {
        return service.getWishListItems(userId);
    }

    @DeleteMapping("/{id}")
    public  ApiResponse<String> deleteWishListItems(@PathVariable Long id)
    {
        return service.deleteWishlistItem(id);
    }
}
