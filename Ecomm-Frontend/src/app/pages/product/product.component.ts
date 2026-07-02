import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  product: any;

  relatedProducts: any[] = [];

  qty: number = 1;

  selectedImage: string | null = null;

  isLoading:boolean = false;

  // TOAST
  toastMessage:string = '';

  showToast(message:string): void
  {
    this.toastMessage = message;

    setTimeout(() => {

      this.toastMessage = '';

    }, 2500);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private wishListService: WishlistService
  ) {}

  ngOnInit(): void
  {
    const id = this.route.snapshot.paramMap.get('id');

    if (id)
    {
      this.loadProduct(Number(id));
    }
  }

  loadProduct(id: number): void
  {

    this.product = {

      id: id,

      name: 'Rose Gold Luxury Ring',

      price: 9999,

      originalPrice: 14999,

      discount: 30,

      description:
        'Handcrafted premium jewelry designed for elegance and timeless beauty.',

      imageUrl:
        'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed',

      images: [

        'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed',

        'https://images.unsplash.com/photo-1605100804763-247f67b3557e',

        'https://images.unsplash.com/photo-1611652022419-a9419f74343d'

      ]
    };

    this.selectedImage = this.product.imageUrl;

    this.relatedProducts = [

      {
        id: 2,
        name: 'Diamond Necklace',
        price: 12999,
        imageUrl: this.product.images[1]
      },

      {
        id: 3,
        name: 'Pearl Earrings',
        price: 4999,
        imageUrl: this.product.images[2]
      },

      {
        id: 4,
        name: 'Gold Ring Set',
        price: 7999,
        imageUrl: this.product.images[0]
      }

    ];
  }

  goBack(): void
  {
    this.router.navigate(['/layout/products']);
  }

  increaseQty(): void
  {
    this.qty++;
  }

  decreaseQty(): void
  {
    if(this.qty > 1)
    {
      this.qty--;
    }
  }

  // ADD TO CART
  addToCart(product: any): void
  {

    this.isLoading = true;

    const cartProduct = {

      productId: product.id,

      productName: product.name,

      price: product.price,

      quantity: this.qty,

      imageUrl: product.imageUrl

    };

    this.cartService.addToCart(cartProduct).subscribe({

      next: (res: any) =>
      {

        console.log("Cart Response:", res);

        this.isLoading = false;

        // UPDATE HEADER BADGE
        this.cartService.getCartItems()
          .subscribe({

            next:(cartRes:any)=>
            {
              this.cartService.updateCartCount(cartRes.data.length);
            }

          });

        this.showToast("Product Added To Cart ✨");
      },

      error: (err:any) =>
      {

        console.log("Cart Error:", err);

        this.isLoading = false;

        this.showToast("Something Went Wrong ❌");
      }

    });

  }

  // WISHLIST
  toggleWishlist(product: any): void
  {

    const wishlistProduct = {

      productId: product.id,

      productName: product.name,

      price: product.price,

      imageUrl: product.imageUrl

    };

    this.wishListService.addToWishlist(wishlistProduct)
      .subscribe({

        next: (res: any) =>
        {

          console.log("Wishlist Response:", res);

          this.showToast("Added To Wishlist ❤️");
        },

        error: (err:any) =>
        {

          console.log("Wishlist Error:", err);

          this.showToast("Wishlist Failed ❌");
        }

      });

  }

  viewProduct(id: number): void
  {
    this.router.navigate(['/layout/product', id]);
  }

}