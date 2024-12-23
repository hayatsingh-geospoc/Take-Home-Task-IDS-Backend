import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Product } from '../graphql/types';
import { ProductService } from '../services/product.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  @UseGuards(JwtAuthGuard)
  async getProducts(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    return this.productService.findAll(page, limit);
  }

  @Query(() => Product)
  @UseGuards(JwtAuthGuard)
  async getProduct(@Args('id') id: string) {
    return this.productService.findById(id);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('price') price: number,
    @Args('stock') stock: number,
  ) {
    return this.productService.create({ name, description, price, stock });
  }
} 