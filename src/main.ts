import Customer from "./domain/entities/customer";
import Address from "./domain//entities/address"; 
import OrderItem from "./domain/entities/order_item";
import Order from "./domain/entities/order";

let customer = new Customer("123", "Diogo Silva");
const address = new Address("Rua 1", 123, "12345-123", "São Paulo");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 100, "1", 2);
const item2 = new OrderItem("2", "Item 2", 200, "2", 2);
const order = new Order("1", customer.id, [item1, item2]);