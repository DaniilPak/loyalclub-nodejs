import { Worker } from "./Worker";
import { Receipt } from "./Receipt";
import { Owner } from "./Owner";

export interface Business {
  name: string;
  pictureUrl: string;
  loyalPercent: number;
  address: string;
  workers: Worker[];
  owner: Owner;
}
