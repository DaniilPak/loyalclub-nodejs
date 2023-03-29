import { Worker } from "./Worker";
import { Receipt } from "./Receipt";

export interface Business {
  name: string;
  pictureUrl: string;
  loyalPercent: number;
  address: string;
  workers: Worker[];
}
