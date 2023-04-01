export {};

import { Router } from "express";
import { BusinessController } from "../controllers/BusinessController";
import { BusinessService } from "../services/BusinessService";
import { checkBusinessOwner } from "../middlewares/checkBusinessOwner";

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
    this.router.post(
      "/worker",
      this.businessController.addWorker.bind(this.businessController)
    );
    this.router.delete(
      "/worker",
      this.businessController.deleteWorker.bind(this.businessController)
    );
    this.router.post(
      "/update",
      checkBusinessOwner,
      this.businessController.updateBusinessInfo.bind(this.businessController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
