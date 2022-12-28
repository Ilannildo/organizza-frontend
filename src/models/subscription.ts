import { IEvent } from "./event";
import { ITicketServiceOrder } from "./ticketServiceOrder";
import { IUser } from "./user";

export interface ISubscription {
  id: string;
  user_id: string;
  event_id: string;
  code_ref: string;
  ticket_service_order_id: string;
  status: "pending" | "processing" | "completed" | "refused";
  created_at?: Date;
  updated_at?: Date;
  user?: IUser;
  event?: IEvent;
  ticket_service_order?: ITicketServiceOrder;
}
