import { IEvent } from "./event";
import { ISessionCover } from "./sessionCover";
import { ISessionDatesForm } from "./sessionDate";
import { ISessionSubscription } from "./sessionSubscription";
import { ISessionTicket } from "./sessionTickets";
import { ISessionType } from "./sessionType";

export interface ISession {
  id: string;
  ref_code: string;
  title: string;
  credit_hour?: number;
  summary: string;
  responsible_name: string;
  event_id: string;
  session_type_id: string;
  place: string;
  start_date: Date;
  end_date: Date;
  status: "published" | "started" | "finished";
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  event?: IEvent;
  session_cover?: ISessionCover;
  session_type?: ISessionType;
  session_tickets?: ISessionTicket;
  session_subscriptions?: ISessionSubscription[];
}

export interface ISessionForm {
  title: string;
  credit_hour?: number;
  summary: string;
  event_id: string;
  session_type_id: string;
  place: string;
  start_date: Date | null;
  end_date: Date | null;
  ticket_price_type_id?: string;
  participant_limit: number;
  value: number;
  dates: ISessionDatesForm[];
}

export interface IEventPageSessions {
  days: string[];
  sessions: {
    start_date: Date;
    end_date: Date;
    is_finished: boolean;
    place: string;
    responsible_name?: string;
    session_id: string;
    summary: string;
    title: string;
  }[][];
}

export interface IGetAllSessionBySessionTypeResponse {
  id: string;
  code_ref?: string;
  title: string;
  start_date: Date;
  end_date: Date;
  value: number;
  is_free: boolean;
  status: "published" | "started" | "finished";
}
