import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Product } from './product.schema';

@Schema()
export class CartItem {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  productId: Product | string;

  @Prop({ required: true })
  quantity: number;
}

@Schema()
export class Cart extends Document {
  @Prop({ required: true, type: String })
  userId: string;

  @Prop([CartItem])
  items: CartItem[];
}

export const CartSchema = SchemaFactory.createForClass(Cart); 