import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item: OrderItem) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    const currentOrderModel = await OrderModel.findOne({
      where: { id: entity.id },
      include: [{ model: OrderItemModel }],
    });

    const currentOrder = new Order(
      currentOrderModel.id,
      currentOrderModel.customer_id,
      currentOrderModel.items.map(item => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      ))
    );

    await this.updateItem(entity, currentOrder);

    await OrderModel.update(
      {
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: [{ model: OrderItemModel }],
    });

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map((item) => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      ))
    );
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [OrderItemModel] // Inclua isso
    });
  
    return orderModels.map((orderModel) => new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items ? orderModel.items.map((item) => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      )) : []
    ));
  }

  private async updateItem(entity: Order, currentOrder: Order): Promise<void> {
    const orderItems = await OrderItemModel.findAll({
      where: { order_id: entity.id },
    });
  
    const orderItemsMap = new Map(orderItems.map(item => [item.id, item]));
  
    for (const item of entity.items) {
      const orderItem = orderItemsMap.get(item.id);
  
      if (orderItem) {
        orderItem.name = item.name;
        orderItem.price = item.price;
        orderItem.product_id = item.productId;
        orderItem.quantity = item.quantity;
        await orderItem.save();
      } else {
        this.addItem(item, entity.id);
      }
    }
  
    await this.removeItem(entity, currentOrder);
  }

  private async addItem(item: OrderItem, order_id: string): Promise<void> {
    await OrderItemModel.create({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity,
      order_id,
    });
  }

  private async removeItem(entity: Order, currentOrder: Order): Promise<void> {
    for (const item of currentOrder.items) {
      if (!entity.items.some((i) => i.id === item.id)) {
        await OrderItemModel.destroy({
          where: {
            id: item.id,
            order_id: currentOrder.id,
          },
        });
      }
    }
  }
}
