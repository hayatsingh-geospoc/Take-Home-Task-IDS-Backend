import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { CartService } from './cart.service';
import { ProductService } from './product.service';
import { OrderResponse } from '../interfaces/order.interface';
export declare class OrderService {
    private orderModel;
    private cartService;
    private productService;
    constructor(orderModel: Model<Order>, cartService: CartService, productService: ProductService);
    private transformProduct;
    private transformOrder;
    createOrder(userId: string): Promise<OrderResponse>;
    getOrders(userId: string): Promise<OrderResponse[]>;
}
