import EventHandlerInterface from "../../event/event-handler.interface";
import EventInterface from "../../event/event.interface";

export class enviaConsoleLog1Handler implements EventHandlerInterface {

   handle(event: EventInterface): void {
      console.log("Esse é o primeiro console.log do evento: CustomerCreated");
   }

}