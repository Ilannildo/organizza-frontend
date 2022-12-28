import { ITransaction } from "./transaction";

export interface IPaymentMethod {
  id: string;
  payment_form: "open" | "processing" | "settled" | "closed" | "canceled";
  name: string;
  fee: number;
  installments: number;
  status: boolean;
  created_at?: Date;
  updated_at?: Date;
  transactions?: ITransaction[];
}
