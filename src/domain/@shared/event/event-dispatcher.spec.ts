import { CreatedAt } from "sequelize-typescript";
import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-products-is-created-handler";
import ProductCreatedEvent from "../../product/event/handler/product-created.event";
import { enviaConsoleLog1Handler } from "../customer/handler/envia-console-log1-handler";
import { enviaConsoleLog2Handler } from "../customer/handler/envia-console-log2-handler";
import CustomerCreatedEvent from "../customer/customer-created.event";
import { enviaConsoleLogHandler } from "../customer/handler/envia-console-log-handler";
import ChangeAddress from "../customer/change-address.event";

describe("Domain events tests", () => {

   it("should register an event handler", () => {
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

   it("should unregister an event handler", () => {
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
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle");

      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(
         eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      const productCreatedEvent = new ProductCreatedEvent({
         name: "Product 1",
         description: "Product 1 description",
         price: 10.0,
         CreatedAt: new Date(),
      });

      // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
      eventDispatcher.notify(productCreatedEvent);

      expect(spyEventHandler).toHaveBeenCalled();
   });

   it("should register an event handler for customer created event", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new enviaConsoleLog1Handler();

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

   it("should unregister an event handler for customer created event", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new enviaConsoleLog1Handler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);

      expect(
         eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

      expect(
         eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
         0
      );
   });

   it("should unregister all event handlers for customer created event", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new enviaConsoleLog1Handler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);

      expect(
         eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregisterAll();

      expect(
         eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeUndefined();
   });

   it("should notify when have two event handlers registered", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler1 = new enviaConsoleLog1Handler();
      const eventHandler2 = new enviaConsoleLog2Handler();
      const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
      const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

      eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
      eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

      expect(
         eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler1);
      expect(
         eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
      ).toMatchObject(eventHandler2);

      const customerCreatedEvent = new CustomerCreatedEvent({
         name: "Customer 1",
         address: {
            street: "Street 1",
            number: 123,
            zip: "Zipcode 1",
            city: "City 1"
         },
         CreatedAt: new Date(),
      });

      eventDispatcher.notify(customerCreatedEvent);

      expect(spyEventHandler1).toHaveBeenCalled();
      expect(spyEventHandler2).toHaveBeenCalled();
   });

   it("should notify when have an customer is created and his address is changed", () => {

      const eventDispatcher = new EventDispatcher();
      const eventHandler = new enviaConsoleLogHandler();
      const eventHandler1 = new enviaConsoleLog1Handler();
      const eventHandler2 = new enviaConsoleLog2Handler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle");
      const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
      const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

      eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
      eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

      const customerCreatedEvent = new CustomerCreatedEvent({
         name: "Customer 1",
         address: {
            street: "Street 1",
            number: 123,
            zip: "Zipcode 1",
            city: "City 1"
         },
         CreatedAt: new Date(),
      });

      const changedAddressEvent = new ChangeAddress({
         name: "Customer 1",
         address: {
            street: "Street 2",
            number: 456,
            zip: "Zipcode 2",
            city: "City 2"
         },
         CreatedAt: new Date(),
      });

      eventDispatcher.notify(customerCreatedEvent);
      eventDispatcher.register("ChangeAddress", eventHandler);
      eventDispatcher.notify(changedAddressEvent);

   });

});