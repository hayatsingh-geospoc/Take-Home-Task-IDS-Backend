import { OrderService } from '../services/order.service';
export declare class OrderResolver {
    private orderService;
    constructor(orderService: OrderService);
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
    checkout(userId: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/order.schema").Order> & import("../schemas/order.schema").Order & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
