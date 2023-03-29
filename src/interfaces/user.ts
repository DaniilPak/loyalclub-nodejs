import { Receipt } from "./Receipt";

export interface User {
  type: "Client" | "Owner" | "Worker";
  phoneNumber: string;
  bonusAmount: number;
  name: string;
  surname: string;
  email?: string;
  homeAddress?: string;
  paymentInfo?: string;
  orderHistory?: Receipt[];
}
