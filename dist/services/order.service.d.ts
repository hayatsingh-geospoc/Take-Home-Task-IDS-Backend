import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { CartService } from './cart.service';
import { ProductService } from './product.service';
import { CartItem } from '../schemas/cart.schema';
export declare class OrderService {
    private orderModel;
    private cartService;
    private productService;
    constructor(orderModel: Model<Order>, cartService: CartService, productService: ProductService);
    createOrder(userId: string): Promise<import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getOrders(userId: string): Promise<{
        items: {
            product: string | import("../schemas/product.schema").Product;
            quantity: number;
        }[];
        userId: string;
        totalPrice: number;
        date: Date;
        _id: any;
        __v?: any;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema;
    }[]>;
    calculateTotalPrice(items: CartItem[]): Promise<number>;
}
