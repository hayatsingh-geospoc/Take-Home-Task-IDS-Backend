import { OrderService } from '../services/order.service';
export declare class OrderResolver {
    private orderService;
    constructor(orderService: OrderService);
    getOrders(userId: string): Promise<import("../interfaces/order.interface").OrderResponse[]>;
    checkout(userId: string): Promise<import("../interfaces/order.interface").OrderResponse>;
}
