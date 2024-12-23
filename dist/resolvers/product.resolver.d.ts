import { ProductService } from '../services/product.service';
export declare class ProductResolver {
    private productService;
    constructor(productService: ProductService);
    getProducts(page: number, limit: number): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/product.schema").Product> & import("../schemas/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getProduct(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/product.schema").Product> & import("../schemas/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createProduct(name: string, description: string, price: number, stock: number): Promise<import("mongoose").Document<unknown, {}, import("../schemas/product.schema").Product> & import("../schemas/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
