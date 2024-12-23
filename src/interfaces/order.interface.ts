import { CartProduct } from './cart.interface';

export interface OrderItemWithProduct {
  product: CartProduct;
  quantity: number;
}

export interface OrderResponse {
  id: string;
  userId: string;
  items: OrderItemWithProduct[];
  totalPrice: number;
  date: Date;
} 