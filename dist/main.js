"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("./entities/customer"));
const address_1 = __importDefault(require("./entities/address"));
const order_item_1 = __importDefault(require("./entities/order_item"));
const order_1 = __importDefault(require("./entities/order"));
let customer = new customer_1.default("123", "Diogo Silva");
const address = new address_1.default("Rua 1", 123, "12345-123", "São Paulo");
customer.Address = address;
customer.activate();
const item1 = new order_item_1.default("1", "Item 1", 100);
const item2 = new order_item_1.default("2", "Item 2", 200);
const order = new order_1.default("1", customer._id, [item1, item2]);
