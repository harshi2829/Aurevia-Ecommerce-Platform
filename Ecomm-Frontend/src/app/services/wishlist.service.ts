import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8080/wishlist";

  // LIVE WISHLIST COUNT
  wishlistCount = new BehaviorSubject<number>(0);

  updateWishlistCount(count: number) {
    this.wishlistCount.next(count);
  }

  // ADD TO WISHLIST
  addToWishlist(product:any)
  {
    return this.http.post(
      `${this.baseUrl}/add`,
      product
    );
  }


  // GET WISHLIST ITEMS
  getWishlistItems()
  {
    return this.http.get(
      `${this.baseUrl}/all`
    );
  }


  // DELETE WISHLIST ITEM
  deleteWishlistItem(id:number)
  {
    return this.http.delete(
      `${this.baseUrl}/${id}`
    );
  }

}