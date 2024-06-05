import Notification from "./notification";

describe("Unit test for notification", () => {
  it("should create errors", () => {
    const notificiation = new Notification();
    const error = {
      message: "Error message",
      context: "Customer",
    };

    notificiation.addError(error);

    expect(notificiation.messages("Customer")).toBe("Customer: Error message,");

    const error2 = {
      message: "Error message 2",
      context: "Customer",
    };

    notificiation.addError(error2);

    const error3 = {
      message: "Error message 3",
      context: "Product",
    };

    notificiation.addError(error3);

    expect(notificiation.messages("Customer")).toBe("Customer: Error message,Customer: Error message 2,");

    expect(notificiation.messages()).toBe("Customer: Error message,Customer: Error message 2,Product: Error message 3,");
  });
});