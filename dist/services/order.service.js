"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("../schemas/order.schema");
const cart_service_1 = require("./cart.service");
const product_service_1 = require("./product.service");
let OrderService = class OrderService {
    constructor(orderModel, cartService, productService) {
        this.orderModel = orderModel;
        this.cartService = cartService;
        this.productService = productService;
    }
    transformProduct(product) {
        return Object.assign(Object.assign({}, product.toObject()), { id: product._id.toString() });
    }
    transformOrder(order) {
        return {
            id: order._id.toString(),
            userId: order.userId,
            items: order.items.map(item => ({
                product: this.transformProduct(item.productId),
                quantity: item.quantity
            })),
            totalPrice: order.totalPrice,
            date: order.date
        };
    }
    async createOrder(userId) {
        const cart = await this.cartService.getCart(userId);
        if (!cart.items.length) {
            throw new Error('Cart is empty');
        }
        let totalPrice = 0;
        const orderItems = [];
        for (const item of cart.items) {
            const product = await this.productService.findById(item.product.id);
            if (!product) {
                throw new Error(`Product not found: ${item.product.id}`);
            }
            await this.productService.updateStock(item.product.id, item.quantity);
            totalPrice += product.price * item.quantity;
            orderItems.push({
                productId: item.product.id,
                quantity: item.quantity
            });
        }
        const order = await this.orderModel.create({
            userId,
            items: orderItems,
            totalPrice,
            date: new Date(),
        });
        await this.cartService.clearCart(userId);
        const populatedOrder = await this.orderModel.findById(order.id)
            .populate({
            path: 'items.productId',
            model: 'Product'
        });
        return this.transformOrder(populatedOrder);
    }
    async getOrders(userId) {
        const orders = await this.orderModel.find({ userId })
            .populate({
            path: 'items.productId',
            model: 'Product'
        })
            .sort({ date: -1 })
            .exec();
        return orders.map(order => this.transformOrder(order));
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cart_service_1.CartService,
        product_service_1.ProductService])
], OrderService);
//# sourceMappingURL=order.service.js.map