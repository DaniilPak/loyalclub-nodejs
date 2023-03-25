import { Receipt } from "./receipt";

export interface User {
  type: "Client" | "Owner" | "Worker";
  phoneNumber: string;
  bonusAmount: number;
  name: string;
  surname: string;
  email?: string;
  homeAddress?: string;
  paymentInfo?: {
    cardNumber: string;
    billingAddress: string;
  };
  orderHistory?: Receipt[];
  preferences?: {
    cuisine: string;
    dietaryRestrictions: string[];
  };
}
