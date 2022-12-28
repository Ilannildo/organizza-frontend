import { IServiceOrder } from "./serviceOrder";
import { ISubscription } from "./subscription";
import { ITicket } from "./ticket";

export interface ITicketServiceOrder {
  id: string;
  service_order_id: string;
  ticket_id: string;
  service_order?: IServiceOrder;
  ticket?: ITicket;
  subscription?: ISubscription;
}
