import { IEmailToken } from "./emailToken";
import { IEvent } from "./event";
import { IRole } from "./role";
import { IServiceOrder } from "./serviceOrder";
import { ISessionSubscription } from "./sessionSubscription";
import { ISubscription } from "./subscription";

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
  email_token?: IEmailToken;
  events?: IEvent[];
  subscriptions?: ISubscription[];
  session_subscriptions?: ISessionSubscription[];
  service_orders?: IServiceOrder[];
}
