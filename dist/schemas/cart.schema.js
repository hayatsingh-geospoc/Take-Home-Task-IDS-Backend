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
exports.CartSchema = exports.Cart = exports.CartItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./product.schema");
let CartItem = class CartItem {
};
exports.CartItem = CartItem;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Product', required: true }),
    __metadata("design:type", product_schema_1.Product)
], CartItem.prototype, "productId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
exports.CartItem = CartItem = __decorate([
    (0, mongoose_1.Schema)()
], CartItem);
let Cart = class Cart extends mongoose_2.Document {
};
exports.Cart = Cart;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Cart.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)([CartItem]),
    __metadata("design:type", Array)
], Cart.prototype, "items", void 0);
exports.Cart = Cart = __decorate([
    (0, mongoose_1.Schema)()
], Cart);
exports.CartSchema = mongoose_1.SchemaFactory.createForClass(Cart);
//# sourceMappingURL=cart.schema.js.map