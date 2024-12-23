import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { Order } from '../graphql/types';
import { OrderService } from '../services/order.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver(() => Order)
@UseGuards(JwtAuthGuard)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query(() => [Order])
  async getOrders(@CurrentUser() userId: string) {
    return this.orderService.getOrders(userId);
  }

  @Mutation(() => Order)
  async checkout(@CurrentUser() userId: string) {
    return this.orderService.createOrder(userId);
  }
} 