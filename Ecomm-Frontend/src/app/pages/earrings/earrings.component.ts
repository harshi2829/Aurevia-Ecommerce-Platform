import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-earrings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './earrings.component.html',
  styleUrl: './earrings.component.scss'
})
export class EarringsComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: (res: any) => {
        const cartItems = res.data;
        this.earrings.forEach(earring => {
          const cartItem = cartItems.find(
            (cart: any) => cart.productId === earring.id
          );
          if (cartItem) {
            earring.cartId = cartItem.id;
            earring.quantity = cartItem.quantity;
          }
        });
      }
    });
  }

  earrings: Product[] = [
    { id:1, name:'Pearl Earrings', price:4999, image:'https://plus.unsplash.com/premium_photo-1675107359599-a2d0d8983c36', cartId: null, quantity: 0, wishlistId: null },
    { id:2, name:'Diamond Earrings', price:8999, image:'https://plus.unsplash.com/premium_photo-1681276170598-8ad7feaf918e', cartId: null, quantity: 0, wishlistId: null },
    { id:3, name:'Gold Earrings', price:6999, image:'assets/images/earring/e1.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:4, name:'Luxury Earrings', price:14999, image:'assets/images/earring/e2.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:5, name:'Silver Earrings', price:3999, image:'assets/images/earring/e3.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:6, name:'Classic Earrings', price:7999, image:'assets/images/earring/e4.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:7, name:'Wedding Earrings', price:16999, image:'assets/images/earring/e5.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:8, name:'Elegant Earrings', price:9999, image:'assets/images/earring/e6.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:9, name:'Minimal Earrings', price:3499, image:'assets/images/earring/e7.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:10, name:'Kundhan Earrings', price:18999, image:'assets/images/earring/e8.jpg', cartId: null, quantity: 0, wishlistId: null }
  ];

  addToCart(earring: Product) {
    const cartItem = {
      productId: earring.id,
      productName: earring.name,
      price: earring.price,
      quantity: 1,
      imageUrl: earring.image
    };
    this.cartService.addToCart(cartItem).subscribe({
      next: (res: any) => {
        earring.cartId = res.data.id;
        earring.quantity = 1;
        this.cartService.getCartItems().subscribe({
          next: (cartRes: any) => {
            this.cartService.updateCartCount(cartRes.data.length);
          }
        });
      },
      error: (err) => console.error('Failed to add to cart:', err)
    });
  }

  increaseQty(earring: Product) {
    const newQty = earring.quantity + 1;
    if(earring.cartId !== null){
      this.cartService.updateQuantity(earring.cartId, newQty).subscribe({
        next: () => { earring.quantity = newQty; },
        error: (err) => console.error('Failed:', err)
      });
    }
  }

  decreaseQty(earring: Product) {
    const newQty = earring.quantity - 1;
    if (earring.cartId !== null){
      if (newQty <= 0) {
        this.cartService.deleteCartItem(earring.cartId).subscribe({
          next: () => {
            earring.cartId = null;
            earring.quantity = 0;
            this.cartService.getCartItems().subscribe({
              next: (cartRes: any) => {
                this.cartService.updateCartCount(cartRes.data.length);
              }
            });
          },
          error: (err) => console.error('Failed to remove item:', err)
        });
      } else {
        this.cartService.updateQuantity(earring.cartId, newQty).subscribe({
          next: () => { earring.quantity = newQty; },
          error: (err) => console.error('Failed:', err)
        });
      }
    }
  }

  toggleWishlist(earring: Product) {
    if (earring.wishlistId) {
      this.wishlistService.deleteWishlistItem(earring.wishlistId).subscribe({
        next: () => {
          earring.wishlistId = null;
          this.wishlistService.getWishlistItems().subscribe({
            next: (wRes: any) => {
              this.wishlistService.updateWishlistCount(wRes.data.length);
            }
          });
        },
        error: (err) => console.error('Failed:', err)
      });
    } else {
      const wishlistItem = {
        productId: earring.id,
        productName: earring.name,
        price: earring.price,
        imageUrl: earring.image
      };
      this.wishlistService.addToWishlist(wishlistItem).subscribe({
        next: (res: any) => {
          earring.wishlistId = res.data.id;
          this.wishlistService.getWishlistItems().subscribe({
            next: (wRes: any) => {
              this.wishlistService.updateWishlistCount(wRes.data.length);
            }
          });
        },
        error: (err) => console.error('Failed:', err)
      });
    }
  }
}