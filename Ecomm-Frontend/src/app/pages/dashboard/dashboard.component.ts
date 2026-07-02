import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private cdr: ChangeDetectorRef
  ) {}

  products = [
    {
      id: 1,
      name: 'Rose Gold Ring',
      price: 9999,
      imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e',
      cartId: null as number | null,
      quantity: 0,
      wishlistId: null as number | null
    },
    {
      id: 2,
      name: 'Diamond Necklace',
      price: 12999,
      imageUrl: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d',
      cartId: null as number | null,
      quantity: 0,
      wishlistId: null as number | null
    },
    {
      id: 3,
      name: 'Pearl Earrings',
      price: 4999,
      imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f',
      cartId: null as number | null,
      quantity: 0,
      wishlistId: null as number | null
    }
  ];

  ngOnInit(): void {
    // Load cart state on page load
    this.cartService.getCartItems().subscribe({
      next: (res: any) => {
        const cartItems = res.data;
        this.products.forEach(product => {
          const cartItem = cartItems.find(
            (cart: any) => cart.productId === product.id
          );
          if (cartItem) {
            product.cartId = cartItem.id;
            product.quantity = cartItem.quantity;
          }
        });
        this.cdr.detectChanges();
      }
    });

    // Load wishlist state on page load
    this.wishlistService.getWishlistItems().subscribe({
      next: (res: any) => {
        const wishlistItems = res.data;
        this.products.forEach(product => {
          const wishlistItem = wishlistItems.find(
            (w: any) => w.productId === product.id
          );
          if (wishlistItem) {
            product.wishlistId = wishlistItem.id;
          }
        });
        this.cdr.detectChanges();
      }
    });
  }

  addToCart(product: any) {
    const cartItem = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl
    };

    this.cartService.addToCart(cartItem).subscribe({
      next: (res: any) => {
        product.cartId = res.data.id;
        product.quantity = res.data.quantity;
        this.cdr.detectChanges();
        this.cartService.getCartItems().subscribe({
          next: (cartRes: any) => {
            this.cartService.updateCartCount(cartRes.data.length);
          }
        });
      },
      error: (err) => console.error('Failed to add to cart:', err)
    });
  }

  increaseQty(product: any) {
    const newQty = product.quantity + 1;
    if (product.cartId !== null) {
      this.cartService.updateQuantity(product.cartId, newQty).subscribe({
        next: () => {
          product.quantity = newQty;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Failed to update quantity:', err)
      });
    }
  }

  decreaseQty(product: any) {
    const newQty = product.quantity - 1;
    if (product.cartId !== null) {
      if (newQty <= 0) {
        this.cartService.deleteCartItem(product.cartId).subscribe({
          next: () => {
            product.cartId = null;
            product.quantity = 0;
            this.cdr.detectChanges();
            this.cartService.getCartItems().subscribe({
              next: (cartRes: any) => {
                this.cartService.updateCartCount(cartRes.data.length);
              }
            });
          },
          error: (err) => console.error('Failed to remove item:', err)
        });
      } else {
        this.cartService.updateQuantity(product.cartId, newQty).subscribe({
          next: () => {
            product.quantity = newQty;
            this.cdr.detectChanges();
          },
          error: (err) => console.error('Failed to update quantity:', err)
        });
      }
    }
  }

  toggleWishlist(product: any) {
    if (product.wishlistId) {
      this.wishlistService.deleteWishlistItem(product.wishlistId).subscribe({
        next: () => {
          product.wishlistId = null;
          this.cdr.detectChanges();
          this.wishlistService.getWishlistItems().subscribe({
            next: (wRes: any) => {
              this.wishlistService.updateWishlistCount(wRes.data.length);
            }
          });
        },
        error: (err) => console.error('Failed to remove from wishlist:', err)
      });
    } else {
      const wishlistItem = {
        productId: product.id,
        productName: product.name,
        price: product.price,
        imageUrl: product.imageUrl
      };
      this.wishlistService.addToWishlist(wishlistItem).subscribe({
        next: (res: any) => {
          product.wishlistId = res.data.id;
          this.cdr.detectChanges();
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