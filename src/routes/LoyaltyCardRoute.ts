export { };

import { Router } from "express";
import { LoyaltyCardController } from "../controllers/LoyaltyCardController";
import { LoyaltyCardService } from "../services/LoyaltyCardService";
import { BusinessService } from "../services/BusinessService";

export class LoyaltyCardRoute {
  private readonly router: Router;
  private readonly loyaltyCardController: LoyaltyCardController;

  constructor() {
    this.router = Router();
    this.loyaltyCardController = new LoyaltyCardController(new LoyaltyCardService(), new BusinessService());
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get("/", this.loyaltyCardController.getLoyaltyCards.bind(this.loyaltyCardController));
    this.router.post(
      "/",
      this.loyaltyCardController.createLoyaltyCard.bind(this.loyaltyCardController)
    );
    this.router.post(
      "/getloyaltycardbyid",
      this.loyaltyCardController.getLoyaltyCardById.bind(this.loyaltyCardController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
