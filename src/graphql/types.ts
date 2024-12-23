import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Product {
  constructor() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.price = 0;
    this.stock = 0;
  }
  
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  stock: number;
}

@ObjectType()
export class CartItem {
  constructor() {
    this.product = new Product();
    this.quantity = 0;
  }

  @Field(() => Product)
  product: Product;

  @Field(() => Int)
  quantity: number;
}

@ObjectType()
export class Cart {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  @Field(() => [CartItem])
  items: CartItem[];

  @Field(() => Float)
  total: number;
}

@ObjectType()
export class Order {
  constructor() {
    this.id = '';
    this.items = [];
    this.totalPrice = 0;
    this.date = new Date();
  }

  @Field(() => ID)
  id: string;

  @Field(() => [CartItem])
  items: CartItem[];

  @Field(() => Float)
  totalPrice: number;

  @Field()
  date: Date;
} 