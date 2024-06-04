import { CreateCustomerUseCase } from "./create.customer.usecase";

const input = {
  name: "John Doe",
  address: {
    street: "Main St",
    number: 123,
    city: "Main City",
    zipcode: "12345-123",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test create customer use case", () => {
  it("should create a customer", async () => {
    const repository = MockRepository();
    const createCustomer = new CreateCustomerUseCase(repository);

    const output = await createCustomer.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      ...input,
    });
  });

  it("should throw an error when namme is missing", async () => {
    const repository = MockRepository();
    const createCustomer = new CreateCustomerUseCase(repository);

    const inputWithoutName = { ...input, name: "" };

    await expect(createCustomer.execute(inputWithoutName)).rejects.toThrow(
      "Name is required"
    );
  })

  it("should throw an error when street is missing", async () => {
    const repository = MockRepository();
    const createCustomer = new CreateCustomerUseCase(repository);

    const inputWithoutStreet = { ...input, address: { ...input.address, street: "" } };

    await expect(createCustomer.execute(inputWithoutStreet)).rejects.toThrow(
      "Street is required"
    );
  })

  it("should throw an error when number is missing", async () => {
    const repository = MockRepository();
    const createCustomer = new CreateCustomerUseCase(repository);

    const inputWithoutNumber = { ...input, address: { ...input.address, number: 0 } };

    await expect(createCustomer.execute(inputWithoutNumber)).rejects.toThrow(
      "Number is required"
    );
  })
});