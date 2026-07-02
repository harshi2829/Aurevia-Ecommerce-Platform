export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  cartId: number | null;
  quantity: number;
  wishlistId: number | null;
}