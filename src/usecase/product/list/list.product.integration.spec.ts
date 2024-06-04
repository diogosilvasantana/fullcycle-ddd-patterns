import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("shoud list products", async () => {
    const productRepository = new ProductRepository();
    const createProduct = new CreateProductUseCase(productRepository);
    
    const input1 = {
      name: "Product A",
      price: 10
    }

    const input2 = {
      name: "Product B",
      price: 20
    }
    
    const output = {
      products: [
        {id: expect.any(String), ...input1},
        {id: expect.any(String), ...input2},
      ]  
    }

    await createProduct.execute(input1);
    await createProduct.execute(input2);

    const listProduct = new ListProductUseCase(productRepository);

    const resultList = await listProduct.execute({});
    expect(resultList).toStrictEqual(output);
  });
});