import { ICity } from "./city";

export interface IState {
  id: string;
  name: string;
  uf: string;
  created_at?: Date;
  updated_at?: Date;
  cities?: ICity[];
}
