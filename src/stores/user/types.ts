export interface IUser {
  readonly uid: string;
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
