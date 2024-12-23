import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { Cart } from '../graphql/types';
import { CartService } from '../services/cart.service';
import { CartResponse } from '../interfaces/cart.interface';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver(() => Cart)
@UseGuards(JwtAuthGuard)
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Query(() => Cart)
  async getCart(@CurrentUser() userId: string): Promise<CartResponse> {
    return this.cartService.getCart(userId);
  }

  @Mutation(() => Cart)
  async addToCart(
    @CurrentUser() userId: string,
    @Args('productId', { type: () => ID }) productId: string,
    @Args('quantity', { type: () => Int }) quantity: number,
  ) {
    return this.cartService.addToCart(userId, productId, quantity);
  }

  @Mutation(() => Cart)
  async removeFromCart(
    @CurrentUser() userId: string,
    @Args('productId', { type: () => ID }) productId: string,
  ) {
    return this.cartService.removeFromCart(userId, productId);
  }
} 