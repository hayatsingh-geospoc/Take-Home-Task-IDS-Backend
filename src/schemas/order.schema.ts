import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CartItem } from './cart.schema';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop([CartItem])
  items: CartItem[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ default: Date.now })
  date: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order); 