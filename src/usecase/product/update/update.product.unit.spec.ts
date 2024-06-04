import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product A", 10);

const input = {
  id: product.id,
  name: "Product A Updated",
  price: 200,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test update product use case", () => {
  it("should update a product", async () => {
    const repository = MockRepository();
    const updateProduct = new UpdateProductUseCase(repository);

    const output = await updateProduct.execute(input);

    expect(output).toEqual(input);
  });
});