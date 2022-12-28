import { IEvent } from "./event";
import { ISession } from "./session";
import { ISessionTicketServiceOrder } from "./sessionTicketServiceOrder";
import { ITicketServiceOrder } from "./ticketServiceOrder";
import { IUser } from "./user";

export interface ISessionSubscription {
  id: string;
  user_id: string;
  session_id: string;
  code_ref: string;
  session_ticket_service_order_id: string;
  status: "pending" | "processing" | "completed" | "refused";
  created_at?: Date;
  updated_at?: Date;
  user?: IUser;
  session?: ISession;
  session_ticket_service_order?: ISessionTicketServiceOrder;
}
