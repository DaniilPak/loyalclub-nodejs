import { User } from "./user";
import { Receipt } from "./receipt";
import { Business } from "./business";

export interface Worker extends User {
  type: "Worker";
  business: Business;
  expirationDate: Date;
  acceptedReceipts: Receipt[];
}
