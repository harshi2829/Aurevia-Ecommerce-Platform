import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  wishlistItems: any[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.loadWishlistItems();
  }

  loadWishlistItems() {
    this.wishlistService.getWishlistItems().subscribe({
      next: (res: any) => {
        this.wishlistItems = res.data;
        this.wishlistService.updateWishlistCount(
          this.wishlistItems.length
        );
      },
      error: (err) => console.error('Failed to load wishlist:', err)
    });
  }

  removeWishlistItem(id: number) {
    this.wishlistService.deleteWishlistItem(id).subscribe({
      next: () => {
        this.wishlistItems = this.wishlistItems.filter(
          item => item.id !== id
        );
        this.wishlistService.updateWishlistCount(
          this.wishlistItems.length
        );
      },
      error: (err) => console.error('Failed to remove:', err)
    });
  }
}