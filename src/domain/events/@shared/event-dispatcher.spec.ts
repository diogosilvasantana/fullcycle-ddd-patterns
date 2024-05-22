import CustomerCreatedEvent from "../customer/customer-created.event";
import SendConsoleLog1Handler from "../customer/handler/send-console-log1.handler";
import SendConsoleLog2Handler from "../customer/handler/send-console-log2.handler";
import SendEmailWhenCustomerAddressAlreadyHandler from "../customer/handler/send-email-when-customer-address-already.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register a product an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister a product an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should register a customer an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister a customer an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    const eventProductHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventProductHandler = jest.spyOn(eventProductHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventProductHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventProductHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product",
      price: 10.0,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventProductHandler).toHaveBeenCalled();

    const eventCustomerHandler1 = new SendConsoleLog1Handler();
    const spyEventCustomerHandler1 = jest.spyOn(
      eventCustomerHandler1,
      "handle"
    );

    eventDispatcher.register("CustomerCreatedEvent", eventCustomerHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventCustomerHandler1);

    let customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
      email: "customer1@test",
    });

    const eventCustomerHandler2 = new SendConsoleLog2Handler();
    const spyEventCustomerHandler2 = jest.spyOn(
      eventCustomerHandler2,
      "handle"
    );

    eventDispatcher.register("CustomerCreatedEvent", eventCustomerHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventCustomerHandler2);

    customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 2",
      email: "customer2@test",
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventCustomerHandler1).toHaveBeenCalled();
    expect(spyEventCustomerHandler2).toHaveBeenCalled();
  });

  it("should already a address an customer", () => {
    const eventDispatcher = new EventDispatcher();

    const eventCustomerAddressAlreadyHandler =
      new SendEmailWhenCustomerAddressAlreadyHandler();
    const spyEventCustomerAddressAlreadyHandler = jest.spyOn(
      eventCustomerAddressAlreadyHandler,
      "handle"
    );

    eventDispatcher.register(
      "CustomerCreatedEvent",
      eventCustomerAddressAlreadyHandler
    );

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventCustomerAddressAlreadyHandler);

    const customerAddressAlreadyEvent = new CustomerCreatedEvent({
      id: "1",
      name: "Customer 1",
      address: "Rua 1, 123, Bairro 1, Cidade 1, Estado 1, CEP 1",
    });

    eventDispatcher.notify(customerAddressAlreadyEvent);

    expect(spyEventCustomerAddressAlreadyHandler).toHaveBeenCalled();
  });
});
