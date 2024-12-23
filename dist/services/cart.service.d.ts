import { Model } from 'mongoose';
import { Cart } from '../schemas/cart.schema';
import { ProductService } from './product.service';
export declare class CartService {
    private cartModel;
    private productService;
    constructor(cartModel: Model<Cart>, productService: ProductService);
    getCart(userId: string): Promise<{
        items: {
            product: string | import("../schemas/product.schema").Product;
            quantity: number;
        }[];
        total: number;
        userId: string;
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
    }>;
    addToCart(userId: string, productId: string, quantity: number): Promise<{
        items: {
            product: string | import("../schemas/product.schema").Product;
            quantity: number;
        }[];
        total: number;
        userId: string;
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
    }>;
    removeFromCart(userId: string, productId: string): Promise<{
        items: {
            product: string | import("../schemas/product.schema").Product;
            quantity: number;
        }[];
        total: number;
        userId: string;
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
    }>;
    clearCart(userId: string): Promise<{
        total: number;
        userId: string;
        items: import("../schemas/cart.schema").CartItem[];
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
    }>;
}
