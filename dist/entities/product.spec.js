"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("./product"));
describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new product_1.default("", "Product 1", 100);
        }).toThrow("Id is required");
    });
    it("should throw error when id name empty", () => {
        expect(() => {
            const product = new product_1.default("123", "", 100);
        }).toThrow("Name is required");
    });
    it("should throw error when pricee is less than zero", () => {
        expect(() => {
            const product = new product_1.default("123", "Product 1", -1);
        }).toThrow("Price must be greater than zero");
    });
    it("should change name", () => {
        const product = new product_1.default("123", "Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });
    it("should change price", () => {
        const product = new product_1.default("123", "Product 1", 100);
        product.changePrice(400);
        expect(product.price).toBe(400);
    });
});
