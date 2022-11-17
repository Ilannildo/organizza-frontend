import { IAddress } from "./address";
import { IUser } from "./user";

export interface IUserHasAddress {
  user_id: string;
  address_id: string;
  user?: IUser;
  address?: IAddress;
}
