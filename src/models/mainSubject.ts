import { IEvent } from "./event";

export interface IMainSubject {
  id: string;
  title: string;
  created_at?: Date;
  updated_at?: Date;
  events?: IEvent[];
}
