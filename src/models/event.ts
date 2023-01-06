import { IEventCover } from "./eventCover";
import { IEventHasAddress } from "./eventHasAddress";
import { IEventType } from "./eventType";
import { IMainSubject } from "./mainSubject";
import { ISession } from "./session";
import { ITicket } from "./ticket";
import { IUser } from "./user";

export interface IEvent {
  id: string;
  title: string;
  slug: string;
  created_by_user_id: string;
  event_type_id: string;
  credit_hour?: number;
  main_subject_id: string;
  short_description: string;
  summary?: string;
  venue_type: "presential" | "online";
  is_private: boolean;
  start_date: Date;
  start_time: Date;
  end_date: Date;
  end_time: Date;
  logo_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  event_responsible_id: string;
  status: "published" | "started" | "finished";
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  created_by_user?: IUser;
  // event_responsible?: IEventResponsible;
  event_has_address?: IEventHasAddress;
  main_subject?: IMainSubject;
  event_type?: IEventType;
  event_cover?: IEventCover;
  tickets?: ITicket[];
  sessions?: ISession[];
}

export interface IEventPage {
  event_id: string;
  title: string;
  short_description: string;
  summary?: string;
  venue_type: "presential" | "online";
  start_date: Date;
  end_date: Date;
  is_finished: boolean;
  event_responsible_name: string;
  event_responsible_email: string;
  event_cover_url?: string;
  logo_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
}
