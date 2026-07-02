package com.example.ecommerce.EcommService;

import com.example.ecommerce.EcommDto.Responce.ApiResponse;
import com.example.ecommerce.EcommEntity.WishListEntity;
import com.example.ecommerce.EcommRepo.WishListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishListService {

    @Autowired
    public WishListRepo repo;

    public ApiResponse<WishListEntity> addToWishList(WishListEntity wishlist)
    {
        WishListEntity saved=repo.save(wishlist);
        return new ApiResponse<>(true,"Product Added To WishList",saved);
    }

    public ApiResponse<List<WishListEntity>> getWishListItems(Long userId)
    {
        List<WishListEntity> items=repo.findByUserId(userId);
        return  new ApiResponse<>(true,"WishList Items Fetched Successfully",items);
    }

    public ApiResponse<String> deleteWishlistItem(Long id)
    {
        if(!repo.existsById(id))
        {
            return new ApiResponse<>(false, "Wishlist Item Not Found", null);
        }

        repo.deleteById(id);

        return new ApiResponse<>(true, "Wishlist Item Removed Successfully", "Deleted ID : " + id);
    }


}
