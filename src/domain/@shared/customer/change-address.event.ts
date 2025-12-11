import EventInterface from "../event/event.interface";

export default class ChangeAddress implements EventInterface {
   
   dataTimeOccurred: Date;
   eventData: any;

   constructor(eventData: any) {
      this.dataTimeOccurred = new Date();
      this.eventData = eventData;
   }
}
