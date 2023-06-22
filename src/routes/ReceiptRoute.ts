export { };

import { Router } from "express";
import { ReceiptController } from "../controllers/ReceiptController";
import { ReceiptService } from "../services/ReceiptService";
import { UserService } from "../services/UserService";
import { LoyaltyCardService } from "../services/LoyaltyCardService";
import { BusinessService } from "../services/BusinessService";
import { checkToken } from "../middlewares/checkToken";

export class ReceiptRoute {
  private readonly router: Router;
  private readonly receiptController: ReceiptController;

  constructor() {
    this.router = Router();
    this.receiptController = new ReceiptController(
      new ReceiptService(
        new UserService(),
        new LoyaltyCardService(),
        new BusinessService()
      ),
      new LoyaltyCardService(),
      new BusinessService(),
      new UserService(),
    );
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get(
      "/",
      this.receiptController.getReceipts.bind(this.receiptController)
    );
    this.router.post(
      "/",
      checkToken,
      this.receiptController.createReceipt.bind(this.receiptController)
    );
    this.router.post(
      "/getdetailedreceipt",
      this.receiptController.getDetailedReceipt.bind(this.receiptController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
