import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = "https://aurevia-ecommerce-platform.onrender.com/cart";
  cartCount = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    private service: AuthService
  ) {}

  addToCart(product: any) {
    const userId = this.service.getUserId();
    const productWithUser = {
      ...product,
      userId: userId    // ✅ add userId to product
    };
    return this.http.post<any>(
      `${this.baseUrl}/add`,
      productWithUser   // ✅ send with userId
    );
  }

  getCartItems() {
    const userId = this.service.getUserId();
    return this.http.get<any>(
      `${this.baseUrl}/all/${userId}`  // ✅ userId in URL
    );
  }

  deleteCartItem(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateCartCount(count: number) {
    this.cartCount.next(count);
  }

  updateQuantity(id: number, quantity: number) {
    return this.http.put(
      `${this.baseUrl}/update/${id}?quantity=${quantity}`,
      {}
    );
  }

  clearCart() {
    const userId = this.service.getUserId();
    return this.http.delete(
      `${this.baseUrl}/clear/${userId}`  // ✅ userId in URL
    );
  }
}