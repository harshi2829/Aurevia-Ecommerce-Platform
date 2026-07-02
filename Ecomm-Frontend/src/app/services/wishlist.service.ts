import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private baseUrl = "https://aurevia-ecommerce-platform.onrender.com/wishlist";

  // LIVE WISHLIST COUNT
  wishlistCount = new BehaviorSubject<number>(0);

  updateWishlistCount(count: number) {
    this.wishlistCount.next(count);
  }

  // ADD TO WISHLIST
  addToWishlist(product: any) {
    const userId = this.authService.getUserId();
    const productWithUser = {
      ...product,
      userId: userId
    };
    return this.http.post(`${this.baseUrl}/add`, productWithUser);
  }

  // GET WISHLIST ITEMS
  getWishlistItems() {
    const userId = this.authService.getUserId();
    return this.http.get(`${this.baseUrl}/all/${userId}`);
  }

  // DELETE WISHLIST ITEM
  deleteWishlistItem(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}