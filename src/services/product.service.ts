import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.productModel.find().skip(skip).limit(limit).exec();
  }

  async findById(id: string) {
    return this.productModel.findById(id).exec();
  }

  async updateStock(id: string, quantity: number) {
    const product = await this.productModel.findById(id);
    if (!product || product.stock < quantity) {
      throw new Error('Insufficient stock');
    }
    
    product.stock -= quantity;
    return product.save();
  }

  async create(productData: { name: string; description: string; price: number; stock: number }) {
    const product = new this.productModel(productData);
    return product.save();
  }
} 