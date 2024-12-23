import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from '../schemas/cart.schema';
import { ProductService } from './product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    private productService: ProductService,
  ) {}

  async getCart(userId: string) {
    let cart = await this.cartModel.findOne({ userId: userId.toString() })
      .populate({
        path: 'items.productId',
        model: 'Product'
      })
      .exec();
      
    if (!cart) {
      cart = await this.cartModel.create({ userId: userId.toString(), items: [] });
    }

    // Calculate total
    let total = 0;
    for (const item of cart.items) {
      const product = item.productId as any;
      total += product.price * item.quantity;
    }

    // Transform the populated data to match GraphQL type
    return {
      ...cart.toObject(),
      items: cart.items.map(item => ({
        product: item.productId,
        quantity: item.quantity
      })),
      total
    };
  }

  async addToCart(userId: string, productId: string, quantity: number) {
    const cart = await this.getCart(userId.toString());
    const existingItem = cart.items.find(item => item.product.id === productId);

    const product = await this.productService.findById(productId);
    if (!product || product.stock < quantity) {
      throw new Error('Product not available in requested quantity');
    }

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }

    const updatedCart = await this.cartModel.findOneAndUpdate(
      { userId: userId.toString() },
      { 
        items: cart.items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity
        }))
      },
      { new: true }
    ).populate({
      path: 'items.productId',
      model: 'Product'
    });

    // Calculate total for updated cart
    let total = 0;
    for (const item of updatedCart.items) {
      const product = item.productId as any;
      total += product.price * item.quantity;
    }

    return {
      ...updatedCart.toObject(),
      items: updatedCart.items.map(item => ({
        product: item.productId,
        quantity: item.quantity
      })),
      total
    };
  }

  async removeFromCart(userId: string, productId: string) {
    const cart = await this.getCart(userId.toString());
    cart.items = cart.items.filter(item => item.product.id !== productId);

    const updatedCart = await this.cartModel.findOneAndUpdate(
      { userId: userId.toString() },
      { 
        items: cart.items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity
        }))
      },
      { new: true }
    ).populate({
      path: 'items.productId',
      model: 'Product'
    });

    // Calculate total for updated cart
    let total = 0;
    for (const item of updatedCart.items) {
      const product = item.productId as any;
      total += product.price * item.quantity;
    }

    return {
      ...updatedCart.toObject(),
      items: updatedCart.items.map(item => ({
        product: item.productId,
        quantity: item.quantity
      })),
      total
    };
  }

  async clearCart(userId: string) {
    const cart = await this.cartModel.findOneAndUpdate(
      { userId: userId.toString() },
      { items: [] },
      { new: true }
    );
    return { ...cart.toObject(), total: 0 };
  }
} 