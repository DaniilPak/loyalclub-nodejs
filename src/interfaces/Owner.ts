import { User } from "./User";
import { Business } from "./Business";

export interface Owner extends User {
  type: "Owner";
  business: Business;
}
