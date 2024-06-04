import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "123 Main St",
          number: 1,
          city: "Springfield",
          zipcode: "62701",
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.address.street).toBe("123 Main St");
    expect(response.body.address.number).toBe(1);
    expect(response.body.address.city).toBe("Springfield");
    expect(response.body.address.zipcode).toBe("62701");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "John",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "123 Main St",
          number: 1,
          city: "Springfield",
          zipcode: "62701",
        },
      });

    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Johne",
        address: {
          street: "567 Main St",
          number: 100,
          city: "Springfield",
          zipcode: "62701",
        },
      });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/customer").send();

    expect(listResponse.body.customers.length).toBe(2);
    expect(listResponse.body.customers[0].name).toBe("John Doe");
    expect(listResponse.body.customers[1].name).toBe("Johne");
  });
});
