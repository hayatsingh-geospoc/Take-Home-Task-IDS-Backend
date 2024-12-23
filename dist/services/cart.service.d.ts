import { Model } from 'mongoose';
import { Cart } from '../schemas/cart.schema';
import { ProductService } from './product.service';
import { CartResponse, CartProduct } from '../interfaces/cart.interface';
export declare class CartService {
    private cartModel;
    private productService;
    constructor(cartModel: Model<Cart>, productService: ProductService);
    private transformProduct;
    getCart(userId: string): Promise<CartResponse>;
    addToCart(userId: string, productId: string, quantity: number): Promise<{
        id: any;
        userId: string;
        items: {
            product: CartProduct;
            quantity: number;
        }[];
        total: number;
    }>;
    removeFromCart(userId: string, productId: string): Promise<{
        id: any;
        userId: string;
        items: {
            product: CartProduct;
            quantity: number;
        }[];
        total: number;
    }>;
    clearCart(userId: string): Promise<{
        id: any;
        userId: string;
        items: any[];
        total: number;
    }>;
}
