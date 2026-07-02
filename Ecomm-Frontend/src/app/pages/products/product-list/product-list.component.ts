import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  products = [
    {
      id: 1,
      name: 'Rose Gold Ring',
      price: 9999,
      imageUrl: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed'
    },
    {
      id: 2,
      name: 'Diamond Necklace',
      price: 12999,
      imageUrl: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d'
    },
    {
      id: 3,
      name: 'Pearl Earrings',
      price: 4999,
      imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f'
    }
  ];

  cart: any[] = []; // temporary cart

  constructor(private router: Router) {}

  viewProduct(id: number) {
    this.router.navigate(['/layout/product', id]);
  }

  addToCart(product: any) {
    this.cart.push(product);
    console.log('Cart updated:', this.cart);
  }
}