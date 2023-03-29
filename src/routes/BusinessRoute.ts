export {};

import { Router } from "express";
import { BusinessController } from "../controllers/BusinessController";
import { BusinessService } from "../services/BusinessService";

export class BusinessRoute {
  private readonly router: Router;
  private readonly businessController: BusinessController;

  constructor() {
    this.router = Router();
    this.businessController = new BusinessController(new BusinessService());
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get(
      "/",
      this.businessController.getBusinesses.bind(this.businessController)
    );
    this.router.post(
      "/",
      this.businessController.createBusiness.bind(this.businessController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
