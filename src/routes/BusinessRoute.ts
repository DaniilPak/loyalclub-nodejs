export { };

import { Router } from "express";
import { BusinessController } from "../controllers/BusinessController";
import { BusinessService } from "../services/BusinessService";
import { checkToken } from "../middlewares/checkToken";
import { UserService } from "../services/UserService";

export class BusinessRoute {
  private readonly router: Router;
  private readonly businessController: BusinessController;

  constructor() {
    this.router = Router();
    this.businessController = new BusinessController(new BusinessService(), new UserService());
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
      "/workeradd",
      checkToken,
      this.businessController.addWorker.bind(this.businessController)
    );
    this.router.post(
      "/workerdelete",
      this.businessController.deleteWorker.bind(this.businessController)
    );
    this.router.post(
      "/update",
      checkToken,
      this.businessController.updateBusinessInfo.bind(this.businessController)
    );
    this.router.post(
      "/getbusinessbyid",
      this.businessController.getBusinessById.bind(this.businessController)
    );
    this.router.post(
      "/getbusinesswithworkers",
      this.businessController.getBusinessWorkersByBid.bind(this.businessController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
