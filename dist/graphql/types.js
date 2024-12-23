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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.Cart = exports.CartItem = exports.Product = void 0;
const graphql_1 = require("@nestjs/graphql");
let Product = class Product {
    constructor() {
        this.id = '';
        this.name = '';
        this.description = '';
        this.price = 0;
        this.stock = 0;
    }
};
exports.Product = Product;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
exports.Product = Product = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [])
], Product);
let CartItem = class CartItem {
    constructor() {
        this.product = new Product();
        this.quantity = 0;
    }
};
exports.CartItem = CartItem;
__decorate([
    (0, graphql_1.Field)(() => Product),
    __metadata("design:type", Product)
], CartItem.prototype, "product", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
exports.CartItem = CartItem = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [])
], CartItem);
let Cart = class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
    }
};
exports.Cart = Cart;
__decorate([
    (0, graphql_1.Field)(() => [CartItem]),
    __metadata("design:type", Array)
], Cart.prototype, "items", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Cart.prototype, "total", void 0);
exports.Cart = Cart = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [])
], Cart);
let Order = class Order {
    constructor() {
        this.id = '';
        this.items = [];
        this.totalPrice = 0;
        this.date = new Date();
    }
};
exports.Order = Order;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CartItem]),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Order.prototype, "date", void 0);
exports.Order = Order = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [])
], Order);
//# sourceMappingURL=types.js.map