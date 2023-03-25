import { Worker } from "./worker";
import { User } from "./user";

export interface Receipt {
  restaurantName: string;
  orderDate: Date;
  client: User;
  worker: Worker;
  orderTotal: number;
  bonusAmount: number;
}
