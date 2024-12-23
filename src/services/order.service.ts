import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { CartService } from './cart.service';
import { ProductService } from './product.service';
import { OrderResponse, OrderItemWithProduct } from '../interfaces/order.interface';
import { CartProduct } from '../interfaces/cart.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private cartService: CartService,
    private productService: ProductService,
  ) {}

  private transformProduct(product: any): CartProduct {
    return {
      ...product.toObject(),
      id: product._id.toString()
    };
  }

  private transformOrder(order: any): OrderResponse {
    return {
      id: order._id.toString(),
      userId: order.userId,
      items: order.items.map(item => ({
        product: this.transformProduct(item.productId),
        quantity: item.quantity
      })),
      totalPrice: order.totalPrice,
      date: order.date
    };
  }

  async createOrder(userId: string): Promise<OrderResponse> {
    const cart = await this.cartService.getCart(userId);
    if (!cart.items.length) {
      throw new Error('Cart is empty');
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = await this.productService.findById(item.product.id);
      if (!product) {
        throw new Error(`Product not found: ${item.product.id}`);
      }

      await this.productService.updateStock(item.product.id, item.quantity);
      totalPrice += product.price * item.quantity;

      orderItems.push({
        productId: item.product.id,
        quantity: item.quantity
      });
    }

    const order = await this.orderModel.create({
      userId,
      items: orderItems,
      totalPrice,
      date: new Date(),
    });

    await this.cartService.clearCart(userId);
    
    const populatedOrder = await this.orderModel.findById(order.id)
      .populate({
        path: 'items.productId',
        model: 'Product'
      });

    return this.transformOrder(populatedOrder);
  }

  async getOrders(userId: string): Promise<OrderResponse[]> {
    const orders = await this.orderModel.find({ userId })
      .populate({
        path: 'items.productId',
        model: 'Product'
      })
      .sort({ date: -1 })
      .exec();

    return orders.map(order => this.transformOrder(order));
  }
} 