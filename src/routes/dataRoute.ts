export {};

import { Router } from "express";
import { DataService } from "../services/dataService";
import { DataController } from "../controllers/dataController";

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
  }

  public getRouter(): Router {
    return this.router;
  }
}
