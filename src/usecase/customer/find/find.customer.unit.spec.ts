import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John Doe");
const address = new Address("Main St", 123, "Main City", "12345-123");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find customer use case", () => {
  it("shoud find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "John Doe",
      address: {
        street: "Main St",
        number: 123,
        city: "Main City",
        zipcode: "12345-123",
      },
    };

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);
  });

  it("shoud throw an error when customer not found", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });

    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
