import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    let customer = CustomerFactory.create("John Doe");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.Address).toBeUndefined();
  });

  it("should created a customer with an address", () => {
    const address = new Address("Street 1", 123, "Main St", "12345-123");
    let customer = CustomerFactory.createWithAddress("John Doe", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.Address).toBe(address);
  });   
});