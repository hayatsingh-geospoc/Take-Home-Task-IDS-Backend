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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cart_schema_1 = require("../schemas/cart.schema");
const product_service_1 = require("./product.service");
let CartService = class CartService {
    constructor(cartModel, productService) {
        this.cartModel = cartModel;
        this.productService = productService;
    }
    async getCart(userId) {
        let cart = await this.cartModel.findOne({ userId: userId.toString() })
            .populate({
            path: 'items.productId',
            model: 'Product'
        })
            .exec();
        if (!cart) {
            cart = await this.cartModel.create({ userId: userId.toString(), items: [] });
        }
        let total = 0;
        for (const item of cart.items) {
            const product = item.productId;
            total += product.price * item.quantity;
        }
        return Object.assign(Object.assign({}, cart.toObject()), { items: cart.items.map(item => ({
                product: item.productId,
                quantity: item.quantity
            })), total });
    }
    async addToCart(userId, productId, quantity) {
        const cart = await this.getCart(userId.toString());
        const existingItem = cart.items.find(item => item.product.id === productId);
        const product = await this.productService.findById(productId);
        if (!product || product.stock < quantity) {
            throw new Error('Product not available in requested quantity');
        }
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            cart.items.push({ product, quantity });
        }
        const updatedCart = await this.cartModel.findOneAndUpdate({ userId: userId.toString() }, {
            items: cart.items.map(item => ({
                productId: item.product.id,
                quantity: item.quantity
            }))
        }, { new: true }).populate({
            path: 'items.productId',
            model: 'Product'
        });
        let total = 0;
        for (const item of updatedCart.items) {
            const product = item.productId;
            total += product.price * item.quantity;
        }
        return Object.assign(Object.assign({}, updatedCart.toObject()), { items: updatedCart.items.map(item => ({
                product: item.productId,
                quantity: item.quantity
            })), total });
    }
    async removeFromCart(userId, productId) {
        const cart = await this.getCart(userId.toString());
        cart.items = cart.items.filter(item => item.product.id !== productId);
        const updatedCart = await this.cartModel.findOneAndUpdate({ userId: userId.toString() }, {
            items: cart.items.map(item => ({
                productId: item.product.id,
                quantity: item.quantity
            }))
        }, { new: true }).populate({
            path: 'items.productId',
            model: 'Product'
        });
        let total = 0;
        for (const item of updatedCart.items) {
            const product = item.productId;
            total += product.price * item.quantity;
        }
        return Object.assign(Object.assign({}, updatedCart.toObject()), { items: updatedCart.items.map(item => ({
                product: item.productId,
                quantity: item.quantity
            })), total });
    }
    async clearCart(userId) {
        const cart = await this.cartModel.findOneAndUpdate({ userId: userId.toString() }, { items: [] }, { new: true });
        return Object.assign(Object.assign({}, cart.toObject()), { total: 0 });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        product_service_1.ProductService])
], CartService);
//# sourceMappingURL=cart.service.js.map