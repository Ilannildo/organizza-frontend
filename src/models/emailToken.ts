import { IUser } from "./user";

export interface IEmailToken {
  readonly id: string;
  expires_in: number;
  user_id: string;
  email_sent: boolean;
  email_sent_at?: Date;
  created_at?: Date;
  updated_at?: Date;

  user?: IUser;
}
