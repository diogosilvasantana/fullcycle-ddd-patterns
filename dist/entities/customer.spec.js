"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./address"));
const customer_1 = __importDefault(require("./customer"));
describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            new customer_1.default("", "John Doe");
        }).toThrow("Id is required");
    });
    it("should throw error when name is empty", () => {
        expect(() => {
            new customer_1.default("123", "");
        }).toThrow("Name is required");
    });
    it("should change name", () => {
        const customer = new customer_1.default("123", "John Doe");
        customer.changeName("Jane Doe");
        expect(customer.name).toBe("Jane Doe");
    });
    it("should activate customer", () => {
        const customer = new customer_1.default("123", "John Doe");
        const address = new address_1.default("Street 1", 123, "Main St", "12345-123");
        customer.Address = address;
        customer.activate();
        expect(customer.isActive).toBe(true);
    });
    it("should desactive customer", () => {
        const customer = new customer_1.default("123", "John Doe");
        customer.desactivate();
        expect(customer.isActive).toBe(false);
    });
    it("should throw error when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new customer_1.default("123", "John Doe");
            customer.activate();
        }).toThrow("Address is mandatory to activate the customer");
    });
});
