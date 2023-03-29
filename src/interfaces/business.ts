import { Worker } from "./worker";
import { Receipt } from "./receipt";

export interface Business {
  name: string;
  pictureUrl: string;
  loyalPercent: number;
  address: string;
  workers: Worker[];
}
