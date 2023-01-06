import { ISession } from "./session";

export interface ISessionCover {
  id: string;
  session_id: string;
  name: string;
  size: number;
  key: string;
  url?: string;

  session?: ISession;
}
