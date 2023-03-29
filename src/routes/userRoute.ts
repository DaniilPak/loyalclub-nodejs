export {};

import { Router } from "express";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";

export class UserRoute {
  private readonly router: Router;
  private readonly userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController(new UserService());
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get("/", this.userController.getUsers.bind(this.userController));
    this.router.post(
      "/",
      this.userController.createUser.bind(this.userController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
 