import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-necklaces',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './necklaces.component.html',
  styleUrl: './necklaces.component.scss'
})


export class NecklacesComponent {
  
  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  necklaces:Product[]= [
    { id:1, name:'Gold Diamond Necklace', price:12999, image:'assets/images/rings/necklace/n1.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:2, name:'Silver Luxury Necklace', price:8999, image:'assets/images/rings/necklace/n2.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:3, name:'Royal Platinum Necklace', price:19999, image:'assets/images/rings/necklace/n3.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:4, name:'Elegant Gold Chain', price:5999, image:'assets/images/rings/necklace/n4.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:5, name:'Diamond Bridal Necklace', price:24999, image:'assets/images/rings/necklace/n5.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:6, name:'Silver Stone Necklace', price:10999, image:'assets/images/rings/necklace/n6.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:7, name:'Luxury Gold Necklace', price:28999, image:'assets/images/rings/necklace/n7.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:8, name:'Premium Diamond Necklace', price:45999, image:'assets/images/rings/necklace/n8.jpg', cartId: null, quantity: 0, wishlistId: null },
    { id:9, name:'Classic Platinum Necklace', price:15999, image:'https://images.unsplash.com/photo-1605100804763-247f67b3557e', cartId: null, quantity: 0, wishlistId: null },
    { id:10, name:'Rose Gold Necklace', price:18999, image:'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed', cartId: null, quantity: 0, wishlistId: null }
  ];

  addToCart(necklace:Product) {
    const cartItem = {
      productId: necklace.id,
      productName: necklace.name,
      price: necklace.price,
      quantity: 1,
      imageUrl: necklace.image
    };
    this.cartService.addToCart(cartItem).subscribe({
      next: (res: any) => {
        necklace.cartId = res.data.id;
        necklace.quantity = 1;
        this.cartService.getCartItems().subscribe({
          next: (cartRes: any) => {
            this.cartService.updateCartCount(cartRes.data.length);
          }
        });
      },
      error: (err) => console.error('Failed to add to cart:', err)
    });
  }

  increaseQty(necklace:Product) {
    const newQty = necklace.quantity + 1;
    if(necklace.cartId!==null){
    this.cartService.updateQuantity(necklace.cartId, newQty).subscribe({
      next: () => { necklace.quantity = newQty; },
      error: (err) => console.error('Failed to update quantity:', err)
    });
  }
  }

  decreaseQty(necklace:Product) {
    const newQty = necklace.quantity - 1;
    if(necklace.cartId!=null){
    if (newQty <= 0) {
      this.cartService.deleteCartItem(necklace.cartId).subscribe({
        next: () => {
          necklace.cartId = null;
          necklace.quantity = 0;
          this.cartService.getCartItems().subscribe({
            next: (cartRes: any) => {
              this.cartService.updateCartCount(cartRes.data.length);
            }
          });
        },
        error: (err) => console.error('Failed to remove item:', err)
      });
    } else {
      this.cartService.updateQuantity(necklace.cartId, newQty).subscribe({
        next: () => { necklace.quantity = newQty; },
        error: (err) => console.error('Failed to update quantity:', err)
      });
    }
    }
  }

  toggleWishlist(necklace:Product) {
    if (necklace.wishlistId) {
      this.wishlistService.deleteWishlistItem(necklace.wishlistId).subscribe({
        next: () => {
          necklace.wishlistId = null;
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
        productId: necklace.id,
        productName: necklace.name,
        price: necklace.price,
        imageUrl: necklace.image
      };
      this.wishlistService.addToWishlist(wishlistItem).subscribe({
        next: (res: any) => {
          necklace.wishlistId = res.data.id;
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