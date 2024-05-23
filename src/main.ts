import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";
import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/value-object/address";

let customer = new Customer("123", "Diogo Silva");
const address = new Address("Rua 1", 123, "12345-123", "São Paulo");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 100, "1", 2);
const item2 = new OrderItem("2", "Item 2", 200, "2", 2);
const order = new Order("1", customer.id, [item1, item2]);