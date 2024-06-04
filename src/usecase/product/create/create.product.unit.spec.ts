import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product Name",
  price: 100,
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test create product use case", () => {
  it("should create a product", async () => {
    const repository = MockRepository();
    const createProduct = new CreateProductUseCase(repository);

    const output = await createProduct.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      ...input,
    });
  });

  it("should throw an error when name is missing", async () => {
    const repository = MockRepository();
    const createProduct = new CreateProductUseCase(repository);

    const inputWithoutName = { ...input, name: "" };

    await expect(createProduct.execute(inputWithoutName)).rejects.toThrow(
      "Name is required"
    );
  })

  it("should throw an error when price must be greater than zero", async () => {
    const repository = MockRepository();
    const createProduct = new CreateProductUseCase(repository);

    const inputWithoutPrice = { ...input, price: -1 };

    await expect(createProduct.execute(inputWithoutPrice)).rejects.toThrow(
      "Price must be greater than zero"
    );
  })
})