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
  created_at: Date;
  updated_at: Date;
  user?: IUser[];
}