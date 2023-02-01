import { ISession } from "./session";

export interface ISessionDates {
  id: string;
  date: Date;
  type: "start" | "end";
  position: number;
  status: "started" | "finished";
  session_id: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  session?: ISession;
}

export interface ISessionDatesForm {
  date: Date;
  type: "start" | "end";
  position: number;
}
