import { Worker } from "./Worker";
import { User } from "./User";

export interface Receipt {
  restaurantName: string;
  orderDate: Date;
  client: User;
  worker: Worker;
  orderTotal: number;
  bonusAmount: number;
}
