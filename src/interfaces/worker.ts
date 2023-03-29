import { User } from "./User";
import { Receipt } from "./Receipt";
import { Business } from "./Business";

export interface Worker extends User {
  type: "Worker";
  business: Business;
  expirationDate: Date;
  acceptedReceipts: Receipt[];
}
