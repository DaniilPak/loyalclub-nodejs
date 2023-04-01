export {};

import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserService } from "../services/UserService";

export class AuthRoute {
  private readonly router: Router;
  private readonly authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController(new UserService);
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post(
      "/",
      this.authController.makeAuth.bind(this.authController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
