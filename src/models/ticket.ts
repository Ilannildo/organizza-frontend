import { IEvent } from "./event";
import { IQuote } from "./quote";

export interface ITicket {
  id: string;
  event_id: string;
  ticket_price_type_id: string;
  category_title: string;
  include_fee: boolean;
  participant_limit: number;
  description: string;
  value: number;
  start_date: Date | null;
  start_time: Date | null;
  due_date: Date | null;
  due_time: Date | null;

  event?: IEvent;
  ticket_price_type?: ITicketPriceType;
}

export interface ITicketPriceType {
  id: string;
  title: string;
  quote_id: string;
  is_free: boolean;

  quote?: IQuote;
}