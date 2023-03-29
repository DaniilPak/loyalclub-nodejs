export {};

import { Router } from "express";
import { LoyaltyCardController } from "../controllers/LoyaltyCardController";
import { LoyaltyCardService } from "../services/LoyaltyCardService";

export class LoyaltyCardRoute {
  private readonly router: Router;
  private readonly loyaltyCardController: LoyaltyCardController;

  constructor() {
    this.router = Router();
    this.loyaltyCardController = new LoyaltyCardController(new LoyaltyCardService());
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get("/", this.loyaltyCardController.getLoyaltyCards.bind(this.loyaltyCardController));
    this.router.post(
      "/",
      this.loyaltyCardController.createLoyaltyCard.bind(this.loyaltyCardController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
 