import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressAlreadyEvent from "../customer-address-already.event";

export default class SendEmailWhenCustomerAddressAlreadyHandler implements EventHandlerInterface<CustomerAddressAlreadyEvent> {
  handle(event: CustomerAddressAlreadyEvent): void {
    console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`);
  }
}