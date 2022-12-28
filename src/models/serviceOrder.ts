import { ISessionTicketServiceOrder } from "./sessionTicketServiceOrder";
import { ITicketServiceOrder } from "./ticketServiceOrder";
import { ITransaction } from "./transaction";
import { IUser } from "./user";

export interface IServiceOrder {
  id: string;
  user_id: string;
  amount_total: number;
  status: "open" | "processing" | "settled" | "closed" | "canceled";
  reason_canceled: string;
  paid_at: Date;
  created_at?: Date;
  type: "event" | "session";
  expires_in: number;
  updated_at?: Date;
  ticket_service_order?: ITicketServiceOrder;
  session_ticket_service_order?: ISessionTicketServiceOrder;
  transactions?: ITransaction[];
  user?: IUser;
}
