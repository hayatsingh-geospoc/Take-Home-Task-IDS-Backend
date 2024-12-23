import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { CartService } from './cart.service';
import { ProductService } from './product.service';
import { CartItem } from '../schemas/cart.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private cartService: CartService,
    private productService: ProductService,
  ) {}

  async createOrder(userId: string) {
    const cart = await this.cartService.getCart(userId);
    if (!cart.items.length) {
      throw new Error('Cart is empty');
    }

    let totalPrice = 0;
    for (const item of cart.items) {
      const productId = typeof item.productId === 'string' ? item.productId : item.productId._id;
      const product = await this.productService.findById(productId);
      await this.productService.updateStock(productId, item.quantity);
      totalPrice += product.price * item.quantity;
    }

    const order = await this.orderModel.create({
      userId,
      items: cart.items.map(item => ({
        productId: typeof item.productId === 'string' ? item.productId : item.productId._id,
        quantity: item.quantity
      })),
      totalPrice,
      date: new Date(),
    });

    await this.cartService.clearCart(userId);
    return order;
  }

  async getOrders(userId: string) {
    return this.orderModel.find({ userId })
      .populate({
        path: 'items.productId',
        model: 'Product'
      })
      .sort({ date: -1 })
      .exec()
      .then(orders => orders.map(order => ({
        ...order.toObject(),
        items: order.items.map(item => ({
          product: item.productId,
          quantity: item.quantity
        }))
      })));
  }

  async calculateTotalPrice(items: CartItem[]): Promise<number> {
    let totalPrice = 0;
    for (const item of items) {
      const productId = typeof item.productId === 'string' ? item.productId : item.productId._id;
      const product = await this.productService.findById(productId);
      if (!product) {
        throw new Error(`Product not found: ${productId}`);
      }
      totalPrice += product.price * item.quantity;
    }
    return totalPrice;
  }
} 