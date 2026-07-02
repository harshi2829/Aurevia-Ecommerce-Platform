import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-luxury-sets',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './luxury-sets.component.html',
  styleUrl: './luxury-sets.component.scss'
})
export class LuxurySetsComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: (res: any) => {
        const cartItems = res.data;
        this.luxurySets.forEach(luxury => {
          const cartItem = cartItems.find(
            (cart: any) => cart.productId === luxury.id
          );
          if (cartItem) {
            luxury.cartId = cartItem.id;
            luxury.quantity = cartItem.quantity;
          }
        });
      }
    });
  }

  luxurySets: Product[] = [
    { id:1, name:'Royal Jewelry Set', price:29999, image:'assets/images/luxury-set/ls4.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:2, name:'Diamond Luxury Set', price:49999, image:'assets/images/luxury-set/ls3.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:3, name:'Wedding Luxury Set', price:39999, image:'assets/images/luxury-set/ls1.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:4, name:'Gold Collection Set', price:25999, image:'assets/images/luxury-set/ls10.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:5, name:'Pearl Luxury Set', price:18999, image:'assets/images/luxury-set/ls11.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:6, name:'Elegant Set', price:22999, image:'assets/images/luxury-set/ls1.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:7, name:'Classic Royal Set', price:34999, image:'assets/images/luxury-set/ls9.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:8, name:'Luxury Diamond Combo', price:55999, image:'assets/images/luxury-set/ls7.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:9, name:'Silver Luxury Set', price:14999, image:'assets/images/luxury-set/ls2.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:10, name:'Premium Wedding Set', price:69999, image:'assets/images/luxury-set/ls8.jpg', cartId: null, quantity: 0, wishlistId: null }
  ];

  addToCart(luxury: Product) {
    const cartItem = {
      productId: luxury.id,
      productName: luxury.name,
      price: luxury.price,
      quantity: 1,
      imageUrl: luxury.image
    };
    this.cartService.addToCart(cartItem).subscribe({
      next: (res: any) => {
        luxury.cartId = res.data.id;
        luxury.quantity = 1;
        this.cartService.getCartItems().subscribe({
          next: (cartRes: any) => {
            this.cartService.updateCartCount(cartRes.data.length);
          }
        });
      },
      error: (err) => console.error('Failed to add to cart:', err)
    });
  }

  increaseQty(luxury: Product) {
    const newQty = luxury.quantity + 1;
    if(luxury.cartId !== null){
      this.cartService.updateQuantity(luxury.cartId, newQty).subscribe({
        next: () => { luxury.quantity = newQty; },
        error: (err) => console.error('Failed:', err)
      });
    }
  }

  decreaseQty(luxury: Product) {
    const newQty = luxury.quantity - 1;
    if(luxury.cartId !== null){
      if (newQty <= 0) {
        this.cartService.deleteCartItem(luxury.cartId).subscribe({
          next: () => {
            luxury.cartId = null;
            luxury.quantity = 0;
            this.cartService.getCartItems().subscribe({
              next: (cartRes: any) => {
                this.cartService.updateCartCount(cartRes.data.length);
              }
            });
          },
          error: (err) => console.error('Failed to remove item:', err)
        });
      } else {
        this.cartService.updateQuantity(luxury.cartId, newQty).subscribe({
          next: () => { luxury.quantity = newQty; },
          error: (err) => console.error('Failed:', err)
        });
      }
    }
  }

  toggleWishlist(luxury: Product) {
    if (luxury.wishlistId) {
      this.wishlistService.deleteWishlistItem(luxury.wishlistId).subscribe({
        next: () => {
          luxury.wishlistId = null;
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
        productId: luxury.id,
        productName: luxury.name,
        price: luxury.price,
        imageUrl: luxury.image
      };
      this.wishlistService.addToWishlist(wishlistItem).subscribe({
        next: (res: any) => {
          luxury.wishlistId = res.data.id;
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