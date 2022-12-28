import { IServiceOrder } from "./serviceOrder";
import { ISessionSubscription } from "./sessionSubscription";
import { ISessionTicket } from "./sessionTickets";

export interface ISessionTicketServiceOrder {
  id: string;
  service_order_id: string;
  session_ticket_id: string;
  service_order?: IServiceOrder;
  session_ticket?: ISessionTicket;
  session_subscription?: ISessionSubscription;
}
