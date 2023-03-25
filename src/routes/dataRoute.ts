export {};

import { Router } from "express";
import { DataService } from "../services/dataService";
import { DataController } from "../controllers/dataController";

import { checkToken } from "../middlewares/checkToken";

export class UserRoute {
  private readonly router: Router;
  private readonly dataController: DataController;

  constructor() {
    this.router = Router();
    this.dataController = new DataController(new DataService());
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get("/", this.dataController.getData.bind(this.dataController));
    this.router.post(
      "/",
      this.dataController.createData.bind(this.dataController)
    );
    this.router.post("/auth", this.dataController.makeAuth.bind(this.dataController));
    this.router.get("/protected", checkToken, this.dataController.getProtectedInfo.bind(this.dataController));
    this.router.get("/getbyid", this.dataController.getDataById.bind(this.dataController));
  }

  public getRouter(): Router {
    return this.router;
  }
}
