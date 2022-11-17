import { IRole } from "./role";

export interface IUser {
  uid: string;
  name: string;
  email: string;
  gender?: string;
  phone?: string;
  photo_url?: string;
  name_badge?: string;
  status: boolean;
  role_id: string;
  email_verificated_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  role?: IRole;
}
