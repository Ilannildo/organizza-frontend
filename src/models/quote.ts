import { ITicketPriceType } from "./ticket";

export interface IQuote {
  id: string;
  name: string;
  percentage: number;
  min_value: number;
  min_base_value: number;
  created_at?: Date;
  updated_at?: Date;
  ticket_price_types?: ITicketPriceType[];
}
