import { IEvent } from "./event";

export interface IEventCover {
  id: string;
  event_id: string;
  name: string;
  size: number;
  key: string;
  url?: string;

  event?: IEvent;
}
