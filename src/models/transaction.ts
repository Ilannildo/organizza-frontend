import { IPaymentMethod } from "./paymentMethod";
import { IServiceOrder } from "./serviceOrder";

export interface ITransaction {
  id: string;
  payment_method_id: string;
  service_order_id: string;
  transaction_id: string;
  processed_response?: string;
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  customer_document: string;
  billing_address?: string;
  billing_number?: string;
  billing_neighborhood?: string;
  billing_city?: string;
  billing_state?: string;
  billing_zipcode?: string;
  operation: "withdraw" | "order";
  status:
    | "started"
    | "processing"
    | "pending"
    | "approved"
    | "refused"
    | "refunded"
    | "chargeback"
    | "error";
  type: "input" | "output";
  created_at?: Date;
  updated_at?: Date;
  payment_method?: IPaymentMethod;
  service_order?: IServiceOrder;
}
