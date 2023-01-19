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

export interface IPayServiceOrderResponse {
  payment_method?:
    | "credit"
    | "debit"
    | "check"
    | "bank_slip"
    | "cash"
    | "deposit"
    | "wallet"
    | "transfer"
    | "pix";
  status:
    | "started"
    | "processing"
    | "pending"
    | "approved"
    | "refused"
    | "refunded"
    | "chargeback"
    | "error";
  qr_code_url?: string;
  qr_code?: string;
  is_free?: boolean;
  order_id?: string;
  expires_at?: Date;
}

export interface IEventPanelSalesResponse {
  total: number;
  processing: number;
}
