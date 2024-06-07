import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "John Doe");
    }).toThrow("Customer: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrow("Customer: Name is required");
  });

  it("should throw error when name is and id are empty", () => {
    expect(() => {
      new Customer("", "");
    }).toThrow("Customer: Id is required, Customer: Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("123", "John Doe");
    customer.changeName("Jane Doe");

    expect(customer.name).toBe("Jane Doe");
  });

  it("should activate customer", () => {
    const customer = new Customer("123", "John Doe");
    const address = new Address("Street 1", 123, "Main St", "12345-123");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should desactive customer", () => {
    const customer = new Customer("123", "John Doe");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("123", "John Doe");
      customer.activate();
    }).toThrow("Address is mandatory to activate a customer");
  });

  it("should add reward points", () => {
    const customer = new Customer(" 123", "John Doe");
    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(20);

    expect(customer.rewardPoints).toBe(30);

    customer.addRewardPoints(30);

    expect(customer.rewardPoints).toBe(60);
  });
});
