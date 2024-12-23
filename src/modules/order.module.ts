import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../schemas/order.schema';
import { OrderService } from '../services/order.service';
import { OrderResolver } from '../resolvers/order.resolver';
import { CartModule } from './cart.module';
import { ProductModule } from './product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CartModule,
    ProductModule,
  ],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {} 