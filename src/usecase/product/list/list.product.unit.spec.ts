import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Product A", 10);
const product2 = ProductFactory.create("b", "Product B", 20);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
}

describe("Unit Test list product use case", () => {
  it("should list all products", async () => {
    const repository = MockRepository();
    const listProduct = new ListProductUseCase(repository);

    const output = await listProduct.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toEqual(product1.id);
    expect(output.products[0].name).toEqual(product1.name);
    expect(output.products[0].price).toEqual(product1.price);
    expect(output.products[1].id).toEqual(product2.id);
    expect(output.products[1].name).toEqual(product2.name);
    expect(output.products[1].price).toEqual(product2.price);
  });
});