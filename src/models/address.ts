import { ICity } from "./city";
import { IEventHasAddress } from "./eventHasAddress";
import { IUserHasAddress } from "./userHasAddress";

export interface IAddress {
  id: string;
  street: string;
  reference?: string;
  neighborhood?: string;
  city_id: string;
  latitude?: string;
  longitude?: string;
  address_link?: string;
  created_at?: Date;
  updated_at?: Date;
  city?: ICity;
  user_has_address?: IUserHasAddress;
  event_has_address?: IEventHasAddress;
}
