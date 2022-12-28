import { ISession } from "./session";
import { ISessionTicketServiceOrder } from "./sessionTicketServiceOrder";
import { ITicketPriceType } from "./ticket";

export interface ISessionTicket {
    id: string;
    session_id: string;
    ticket_price_type_id: string;
    category_title: string;
    include_fee: boolean;
    participant_limit: number;
    description: string;
    value: number;
    sold?: number;
    start_date: Date | null;
    start_time: Date | null;
    due_date: Date | null;
    due_time: Date | null;
  
    session?: ISession;
    ticket_price_type?: ITicketPriceType;
    session_ticket_service_orders?: ISessionTicketServiceOrder[]
  }
  
  export interface ISessionTicketForm {
    session_id: string;
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
  }