import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendEmailWhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
  static counter = 0;

  handle(event: CustomerCreatedEvent): void {
    SendEmailWhenCustomerIsCreatedHandler.counter++;
    const ordinalNumber = this.getOrdinalNumber(SendEmailWhenCustomerIsCreatedHandler.counter);
    console.log(`Esse é o ${ordinalNumber} console.log do evento: CustomerCreated`);
  }

  private getOrdinalNumber(n: number) {
    const suffixes = ["primeiro", "segundo", "terceiro", "quarto", "quinto", "sexto", "sétimo", "oitavo", "nono", "décimo", "décimo primeiro", "décimo segundo", "décimo terceiro", "décimo quarto", "décimo quinto", "décimo sexto", "décimo sétimo", "décimo oitavo", "décimo nono", "vigésimo"];
    return suffixes[n - 1];
  }
}