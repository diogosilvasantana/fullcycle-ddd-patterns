import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Main St", 123, "Main City", "12345-123")
);

const input = {
  id: customer.id,
  name: "John Updated",
  address: {
    street: "Main St Updated",
    number: 1234,
    city: "Main City Updated",
    zipcode: "12345-654",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test update customer use case", () => {
  it("should update a customer", async () => {
    const repository = MockRepository();
    const updateCustomer = new UpdateCustomerUseCase(repository);

    const output = await updateCustomer.execute(input);

    expect(output).toEqual(input);
  });
});