import { CartService } from '../services/cart.service';
export declare class CartResolver {
    private cartService;
    constructor(cartService: CartService);
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
}
