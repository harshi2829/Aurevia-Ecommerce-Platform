import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  totalAmount: number = 0;
  totalQuantity: number = 0;

  toastMessage = '';
  toastType: 'success' | 'error' | '' = '';
  showToast = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  showToastMsg(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => { this.showToast = false; }, 3000);
  }

  getCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (res: any) => {
        this.cartItems = res.data;
        this.calculateTotal();
      },
      error: () => {
        this.showToastMsg("Failed to load cart", "error");
      }
    });
  }

  calculateTotal() {
    this.totalAmount = 0;
    this.totalQuantity = 0;
    this.cartItems.forEach(item => {
      this.totalAmount += item.price * item.quantity;
      this.totalQuantity += item.quantity;  // sum of all quantities
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.getCartItems();
        this.cartService.updateCartCount(0);
        this.showToastMsg("Cart cleared", "success");
      },
      error: () => {
        this.showToastMsg("Failed to clear cart", "error");
      }
    });
  }

  removeItem(id: number) {
    this.cartService.deleteCartItem(id).subscribe({
      next: () => {
        this.getCartItems();
        this.cartService.getCartItems().subscribe({
          next: (res: any) => {
            this.cartService.updateCartCount(res.data.length);
          }
        });
        this.showToastMsg("Item removed", "success");
      },
      error: () => {
        this.showToastMsg("Failed to remove item", "error");
      }
    });
  }
}