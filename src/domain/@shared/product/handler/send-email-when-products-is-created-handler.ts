import EventHandlerInterface from "../../event/event-handler.interface";
import ProductCreatedEvent from "../../../product/event/handler/product-created.event";

export default class SendEmailWhenProductIsCreatedHandler
   implements EventHandlerInterface<ProductCreatedEvent> {

   handle(event: ProductCreatedEvent): void {
      console.log(`Sending email to...`);
   }

}