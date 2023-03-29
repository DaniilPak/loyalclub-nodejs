export {};

import { Router } from "express";
import { ReceiptController } from "../controllers/ReceiptController";
import { ReceiptService } from "../services/ReceiptService";

export class ReceiptRoute {
  private readonly router: Router;
  private readonly receiptController: ReceiptController;

  constructor() {
    this.router = Router();
    this.receiptController = new ReceiptController(new ReceiptService());
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get("/", this.receiptController.getReceipts.bind(this.receiptController));
    this.router.post(
      "/",
      this.receiptController.createReceipt.bind(this.receiptController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
 