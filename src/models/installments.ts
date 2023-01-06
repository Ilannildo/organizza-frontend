import { IPaymentMethod } from "./paymentMethod";

export interface IInstallment {
  id: string;
  title: string;
  fee: number;
  number: string;
  payment_method_id: string;
  status: boolean;
  created_at?: Date;
  updated_at?: Date;
  payment_method?: IPaymentMethod;
}

export interface IInstallmentResponse {
  price: number;
  total: number;
  number: number;
}
