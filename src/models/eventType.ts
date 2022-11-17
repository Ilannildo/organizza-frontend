import { IEvent } from "./event";

export interface IEventType {
  id: string;
  title: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  events?: IEvent[];
}
