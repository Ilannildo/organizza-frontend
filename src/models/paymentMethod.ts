import { IInstallment } from "./installments";
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
  status: boolean;
  created_at?: Date;
  updated_at?: Date;
  transactions?: ITransaction[];
  installments?: IInstallment[];
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

export interface IPaymentCardForm {
  cardNumber: string;
  cardOwnerName: string;
  expirationDate: string;
  securityCode: string;
  userDocument: string;
  documentType: string;
  phoneNumber: string;
}
