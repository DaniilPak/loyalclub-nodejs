import { Worker } from "./worker";
import { Receipt } from "./receipt";

export interface Business {
  name: string;
  loyalPercent: number,
  address: string;
  workers: Worker[];
}
