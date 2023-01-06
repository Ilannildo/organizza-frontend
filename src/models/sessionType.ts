import { ISession } from "./session";

export interface ISessionType {
  id: string;
  title: string;
  icon_name?: string;
  is_menu: boolean;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  sessions?: ISession[];
}

export interface ISessionTypeMenu {
  id: string;
  title: string;
  type: "item";
  url: string;
  breadcrumbs: boolean;
}
