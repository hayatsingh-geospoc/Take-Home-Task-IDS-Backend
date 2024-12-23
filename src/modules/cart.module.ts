import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from '../schemas/cart.schema';
import { CartService } from '../services/cart.service';
import { CartResolver } from '../resolvers/cart.resolver';
import { ProductModule } from './product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    ProductModule,
  ],
  providers: [CartService, CartResolver],
  exports: [CartService],
})
export class CartModule {} 