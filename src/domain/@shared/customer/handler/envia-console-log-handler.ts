import EventHandlerInterface from "../../event/event-handler.interface";
import EventInterface from "../../event/event.interface";

export class enviaConsoleLogHandler implements EventHandlerInterface {

   handle(event: EventInterface): void {
      console.log("Endereço do cliente : " + event.eventData.id + ", " + event.eventData.name + " alterado para " + event.eventData.address.street + ", " + event.eventData.address.number + ", " + event.eventData.address.zip + ", " + event.eventData.address.city);
   }

}