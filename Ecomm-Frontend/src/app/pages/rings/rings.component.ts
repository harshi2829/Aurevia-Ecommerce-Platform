import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-rings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rings.component.html',
  styleUrl: './rings.component.scss'
})

export class RingsComponent {

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private wishlistService: WishlistService
  ) {}

  showToast = false;

  rings:Product[]=[
    { id: 1, name: 'Rose Gold Ring', price: 9999, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e', cartId: null, quantity: 0, wishlistId: null },
    { id: 2, name: 'Diamond Engagement Ring', price: 15999, image: 'assets/images/rings/ring1.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id: 3, name: 'Silver Luxury Ring', price: 7999, image: 'assets/images/rings/ring2.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id: 4, name: 'Royal Platinum Ring', price: 18999, image: 'assets/images/rings/ring3.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id: 5, name: 'Classic Wedding Ring', price: 12999, image: 'assets/images/rings/ring4.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id: 6, name: 'Luxury Diamond Ring', price: 24999, image: 'assets/images/rings/ring6.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id: 7, name: 'Elegant Gold Ring', price: 10999, image: 'assets/images/rings/ring5.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id: 8, name: 'Couple Ring Set', price: 14999, image: 'assets/images/rings/ring8.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id: 9, name: 'Premium Stone Ring', price: 8999, image: 'assets/images/rings/ring7.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id: 10, name: 'Modern Gold Ring', price: 13999, image: 'assets/images/rings/ring9.jpg', cartId: null, quantity: 0, wishlistId: null }
  ];

  addToCart(ring:Product) {
    const cartItem = {
      productId: ring.id,
      productName: ring.name,
      price: ring.price,
      quantity: 1,
      imageUrl: ring.image
    };
    this.cartService.addToCart(cartItem).subscribe({
      next: (res: any) => {
        ring.cartId = res.data.id;
        ring.quantity = 1;
        this.cartService.getCartItems().subscribe({
          next: (cartRes: any) => {
            this.cartService.updateCartCount(cartRes.data.length);
          }
        });
      },
      error: (err) => console.error('Failed to add to cart:', err)
    });
  }

  increaseQty(ring:Product) {
    const newQty = ring.quantity + 1;
    if (ring.cartId!== null){
    this.cartService.updateQuantity(ring.cartId, newQty).subscribe({
      next: () => { ring.quantity = newQty; },
      error: (err) => console.error('Failed to update quantity:', err)
    });
  }
  }

  decreaseQty(ring:Product) {
    const newQty = ring.quantity - 1;
    if (ring.cartId!== null){
    if (newQty <= 0) {
      this.cartService.deleteCartItem(ring.cartId).subscribe({
        next: () => {
          ring.cartId = null;
          ring.quantity = 0;
          this.cartService.getCartItems().subscribe({
            next: (cartRes: any) => {
              this.cartService.updateCartCount(cartRes.data.length);
            }
          });
        },
        error: (err) => console.error('Failed to remove item:', err)
      });
    } else {
      this.cartService.updateQuantity(ring.cartId, newQty).subscribe({
        next: () => { ring.quantity = newQty; },
        error: (err) => console.error('Failed to update quantity:', err)
      });
    }
    }
  }

  toggleWishlist(ring:Product) {
    if (ring.wishlistId) {
      this.wishlistService.deleteWishlistItem(ring.wishlistId).subscribe({
        next: () => {
          ring.wishlistId = null;
          // UPDATE BADGE LIVE
          this.wishlistService.getWishlistItems().subscribe({
            next: (wRes: any) => {
              this.wishlistService.updateWishlistCount(wRes.data.length);
            }
          });
        },
        error: (err) => console.error('Failed to remove from wishlist:', err)
      });
    }
     else {
      const wishlistItem = {
        productId: ring.id,
        productName: ring.name,
        price: ring.price,
        imageUrl: ring.image
      };
      this.wishlistService.addToWishlist(wishlistItem).subscribe({
        next: (res: any) => {
          ring.wishlistId = res.data.id;
          // UPDATE BADGE LIVE
          this.wishlistService.getWishlistItems().subscribe({
            next: (wRes: any) => {
              this.wishlistService.updateWishlistCount(wRes.data.length);
            }
          });
        },

        error: (err) => console.error('Failed to add to wishlist:', err)
      });
    }
  }
}