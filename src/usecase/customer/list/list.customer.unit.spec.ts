import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Main St", 123, "Main City", "12345-123")
)

const customer2 = CustomerFactory.createWithAddress(
  "Jane 1",
  new Address("Second St", 456, "Second City", "12345-456")
)

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  };
}

describe("Unit Test list customer use case", () => {
  it("should list all customers", async () => {
    const repository = MockRepository();
    const listCustomer = new ListCustomerUseCase(repository);

    const output = await listCustomer.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toEqual(customer1.id);
    expect(output.customers[0].name).toEqual(customer1.name);
    expect(output.customers[0].address.street).toEqual(customer1.Address.street);
    expect(output.customers[1].id).toEqual(customer2.id);
    expect(output.customers[1].name).toEqual(customer2.name);
    expect(output.customers[1].address.street).toEqual(customer2.Address.street);
  });
});