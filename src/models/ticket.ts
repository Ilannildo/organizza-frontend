import { IEvent } from "./event";
import { IQuote } from "./quote";
import { ISessionTicket } from "./sessionTickets";
import { ITicketServiceOrder } from "./ticketServiceOrder";

export interface ITicket {
  id: string;
  event_id: string;
  ticket_price_type_id: string;
  category_title: string;
  include_fee: boolean;
  participant_limit: number;
  description: string;
  value: number;
  sold?: number;
  start_date: Date | null;
  due_date: Date | null;

  event?: IEvent;
  ticket_price_type?: ITicketPriceType;
  ticket_service_order?: ITicketServiceOrder[];
}

export interface ITicketForm {
  event_id: string;
  ticket_price_type_id: string;
  category_title: string;
  include_fee: boolean;
  participant_limit: number;
  description: string;
  value: number;
  start_date: Date | null;
  due_date: Date | null;
}

export interface ITicketPriceType {
  id: string;
  title: string;
  quote_id: string;
  is_free: boolean;
  created_at?: Date;
  updated_at?: Date;
  quote?: IQuote;
  tickets?: ITicket[];
  session_tickets?: ISessionTicket[];
}

export interface IEventPageTickets {
  ticket_id: string;
  category_title: string;
  description: string;
  available: boolean;
  value: number;
  is_free: boolean;
  status: string;
  due_date: Date;
}

export interface IEventPanelTicketInformationResponse {
  sold: number;
  canceled: number;
  remaining: number;
}
