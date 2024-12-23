import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Cart } from '../graphql/types';
import { CartService } from '../services/cart.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver(() => Cart)
@UseGuards(JwtAuthGuard)
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Query(() => Cart)
  async getCart(@CurrentUser() userId: string) {
    return this.cartService.getCart(userId);
  }

  @Mutation(() => Cart)
  async addToCart(
    @CurrentUser() userId: string,
    @Args('productId') productId: string,
    @Args('quantity', { type: () => Int }) quantity: number,
  ) {
    return this.cartService.addToCart(userId, productId, quantity);
  }

  @Mutation(() => Cart)
  async removeFromCart(
    @CurrentUser() userId: string,
    @Args('productId') productId: string,
  ) {
    return this.cartService.removeFromCart(userId, productId);
  }
} 