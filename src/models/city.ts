import { IAddress } from "./address";
import { IState } from "./state";

export interface ICity {
  id: string;
  name: string;
  zipcode: string;
  state_id: string;
  is_available_event: boolean;
  created_at?: Date;
  updated_at?: Date;
  state?: IState;
  addresses?: IAddress[];
}
