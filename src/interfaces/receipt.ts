import { Worker } from "./Worker";
import { User } from "./User";

export interface Receipt {
  purchaseDate: Date;
  purchaseAmount: number;
  card: string; // ID of the loyalty card this receipt is associated with
  client: User;
  worker: Worker;
  bonusAmount: number;
  minusBonus: number;
}
