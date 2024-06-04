import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "../find/find.product.usecase";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "../create/create.product.usecase";
import { InputFindProductDto } from "../find/find.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
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

  it("shoud update a product", async () => {
    const productRepository = new ProductRepository();
    const createProduct = new CreateProductUseCase(productRepository);
    
    const input = {
      name: "Product A",
      price: 10
    }
    
    const output = {
      id: expect.any(String),
      name: "Product A",
      price: 10
    }

    const resultCreated = await createProduct.execute(input);
    expect(resultCreated).toStrictEqual(output);

    const updateProduct = new UpdateProductUseCase(productRepository);

    const inputUpdate = {
      id: resultCreated.id,
      name: "Product B",
      price: 20
    }

    const outputUpdate = {
      id: resultCreated.id,
      name: "Product B",
      price: 20
    }

    const resultUpdated = await updateProduct.execute(inputUpdate);
    expect(resultUpdated).toStrictEqual(outputUpdate);
  });
});