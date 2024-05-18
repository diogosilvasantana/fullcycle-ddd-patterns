"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("./order"));
const order_item_1 = __importDefault(require("./order_item"));
describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            new order_1.default("", "123", []);
        }).toThrow("Id is required");
    });
    it("should throw error when customerId is empty", () => {
        expect(() => {
            new order_1.default("123", "", []);
        }).toThrow("CustomerId is required");
    });
    it("should throw error when items is empty", () => {
        expect(() => {
            new order_1.default("123", "123", []);
        }).toThrow("Items are required");
    });
    it("should calculate total", () => {
        const item1 = new order_item_1.default("i1", "item 1", 100, "p1", 2);
        const item2 = new order_item_1.default("i2", "item 2", 200, "p2", 2);
        const order = new order_1.default("o1", "c1", [item1]);
        let total = order.total();
        expect(total).toBe(200);
        const order2 = new order_1.default("o1", "c1", [item1, item2]);
        total = order2.total();
        expect(total).toBe(600);
    });
    it("should throw error if the item qtd is less or equal zero", () => {
        expect(() => {
            const item = new order_item_1.default("i1", "item 1", 100, "p1", 0);
            const order = new order_1.default("o1", "c1", [item]);
        }).toThrow("Quantity must be greater than 0");
    });
});
