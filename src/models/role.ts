import { IUser } from "./user";

export interface IRole {
  readonly id: string;
  name: string;
  register_user: boolean;
  delete_user: boolean;
  edit_user: boolean;
  view_user: boolean;
  register_event: boolean;
  delete_event: boolean;
  edit_event: boolean;
  view_event: boolean;
  register_ticket: boolean;
  delete_ticket: boolean;
  edit_ticket: boolean;
  view_ticket: boolean;
  register_session: boolean;
  delete_session: boolean;
  edit_session: boolean;
  view_session: boolean;
  created_at: Date;
  updated_at: Date;
  user?: IUser[];
}
