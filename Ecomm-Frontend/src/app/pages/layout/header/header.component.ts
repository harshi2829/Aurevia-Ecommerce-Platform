import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CartService } from '../../../services/cart.service';
import { WishlistService } from '../../../services/wishlist.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  cartCount: number = 0;
  wishlistCount: number = 0;
  initials: string = '?';       // NEW
  username: string = 'Guest';   // NEW

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private authService: AuthService   // NEW
  ) {}

  ngOnInit(): void {

    // NEW — load user initials from localStorage
    this.initials = this.authService.getInitials();
    this.username = this.authService.getUsername();

    // CART — live updates
    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count;
    });

    // WISHLIST — live updates
    this.wishlistService.wishlistCount.subscribe(count => {
      this.wishlistCount = count;
    });

    this.loadCartCount();
    this.loadWishlistCount();
  }

  loadCartCount() {
    this.cartService.getCartItems().subscribe({
      next: (res: any) => {
        this.cartCount = res.data.length;
        this.cartService.updateCartCount(this.cartCount);
      }
    });
  }

  loadWishlistCount() {
    this.wishlistService.getWishlistItems().subscribe({
      next: (res: any) => {
        this.wishlistCount = res.data.length;
        this.wishlistService.updateWishlistCount(this.wishlistCount);
      }
    });
  }
}