import { CartService } from '../services/cart.service';
import { CartResponse } from '../interfaces/cart.interface';
export declare class CartResolver {
    private cartService;
    constructor(cartService: CartService);
    getCart(userId: string): Promise<CartResponse>;
    addToCart(userId: string, productId: string, quantity: number): Promise<{
        id: any;
        userId: string;
        items: {
            product: import("../interfaces/cart.interface").CartProduct;
            quantity: number;
        }[];
        total: number;
    }>;
    removeFromCart(userId: string, productId: string): Promise<{
        id: any;
        userId: string;
        items: {
            product: import("../interfaces/cart.interface").CartProduct;
            quantity: number;
        }[];
        total: number;
    }>;
}
