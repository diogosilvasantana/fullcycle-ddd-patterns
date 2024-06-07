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

  it("should check if notification has at least one error", () => {
    const notificiation = new Notification();
    const error = {
      message: "Error message",
      context: "Customer",
    };

    notificiation.addError(error);

    expect(notificiation.hasErrors()).toBe(true);
  })

  it("should get all errors props", () => {
    const notification = new Notification();
    const error = {
      message: "Error message",
      context: "Customer",
    };

    notification.addError(error);

    const error2 = {
      message: "Error message 2",
      context: "Customer",
    };

    notification.addError(error2);

    const error3 = {
      message: "Error message 3",
      context: "Product",
    };

    notification.addError(error3);

    expect(notification.getErrors()).toEqual([error, error2, error3]);
  });
});