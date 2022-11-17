import { IAddress } from "./address";
import { IEvent } from "./event";

export interface IEventHasAddress {
  event_id: string;
  address_id: string;
  event?: IEvent;
  address?: IAddress;
}
