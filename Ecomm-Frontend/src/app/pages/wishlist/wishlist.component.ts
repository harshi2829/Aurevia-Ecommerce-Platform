import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class  WishlistComponent {

  constructor(private http: HttpClient,private service:AuthService) { }

  private baseUrl = "http://localhost:8080/wishlist";

  // LIVE WISHLIST COUNT
  wishlistCount = new BehaviorSubject<number>(0);

  updateWishlistCount(count: number) {
    this.wishlistCount.next(count);
  }

  addToWishlist(product:any) {
    const userId=this.service.getUserId();
    const productWithUser = {
    ...product,                     
    userId: userId                   
  };
    return this.http.post(`${this.baseUrl}/add`, productWithUser);
  }

  getWishlistItems() {
    const userId=this.service.getUserId();
    return this.http.get(`${this.baseUrl}/all/${userId}`);
  }

  deleteWishlistItem(id:number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}