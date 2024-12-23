import { Document, Schema as MongooseSchema } from 'mongoose';
import { Product } from './product.schema';
export declare class CartItem {
    productId: Product | string;
    quantity: number;
}
export declare class Cart extends Document {
    userId: string;
    items: CartItem[];
}
export declare const CartSchema: MongooseSchema<Cart, import("mongoose").Model<Cart, any, any, any, Document<unknown, any, Cart> & Cart & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cart, Document<unknown, {}, import("mongoose").FlatRecord<Cart>> & import("mongoose").FlatRecord<Cart> & {
    _id: import("mongoose").Types.ObjectId;
}>;
