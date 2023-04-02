import { LoyaltyCard } from "./LoayltyCard";
import { Receipt } from "./Receipt";

export interface User {
  type: "Client" | "Owner" | "Worker";
  phoneNumber: string;
  password: string;
  name: string;
  surname: string;
  email?: string;
  homeAddress?: string;
  paymentInfo?: string;
  orderHistory?: Receipt[];
  loyaltyCards?: LoyaltyCard[];
}
