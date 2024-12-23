import { Product } from '../schemas/product.schema';

export interface CartProduct extends Product {
  id: string;
}

export interface CartItemWithProduct {
  product: CartProduct;
  quantity: number;
}

export interface CartResponse {
  id: string;
  userId: string;
  items: CartItemWithProduct[];
  total: number;
} 