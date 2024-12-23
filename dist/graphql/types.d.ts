export declare class Product {
    constructor();
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
}
export declare class CartItem {
    constructor();
    product: Product;
    quantity: number;
}
export declare class Cart {
    constructor();
    items: CartItem[];
    total: number;
}
export declare class Order {
    constructor();
    id: string;
    items: CartItem[];
    totalPrice: number;
    date: Date;
}
