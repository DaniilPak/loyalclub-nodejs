import { Receipt } from "./Receipt";
import { Business } from "./Business";
import { User } from "./User";

export interface LoyaltyCard {
  userOwner: User;
  business: Business;
  receipts: Receipt[];
  businessName: string;
}
