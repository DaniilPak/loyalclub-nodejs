import { User } from "./User";
import { Receipt } from "./Receipt";

export interface Worker extends User {
  type: "Worker";
  workBusiness: string;
  expirationDate: Date;
  acceptedReceipts: Receipt[];
}
