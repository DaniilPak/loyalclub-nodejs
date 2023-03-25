import { User } from "./user";
import { Business } from "./business";

export interface Owner extends User {
  type: "Owner";
  business: Business;
}
