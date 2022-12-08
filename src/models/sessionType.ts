import { ISession } from "./session";

export interface ISessionType {
  id: string;
  title: string;
  icon_name?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  sessions?: ISession[];
}
