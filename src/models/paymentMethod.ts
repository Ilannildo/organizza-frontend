import { ITransaction } from "./transaction";

export interface IPaymentMethod {
  id: string;
  payment_form:
    | "credit"
    | "debit"
    | "check"
    | "bank_slip"
    | "cash"
    | "deposit"
    | "wallet"
    | "transfer"
    | "pix";
  name: string;
  informations?: string;
  fee: number;
  installments: number;
  status: boolean;
  created_at?: Date;
  updated_at?: Date;
  transactions?: ITransaction[];
}

export interface IPaymentMethodResponse {
  payment_id: string;
  payment_title: string;
  payment_type:
    | "credit"
    | "debit"
    | "check"
    | "bank_slip"
    | "cash"
    | "deposit"
    | "wallet"
    | "transfer"
    | "pix";
  information: string;
}