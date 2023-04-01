export {};

import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export class AuthRoute {
  private readonly router: Router;
  private readonly authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post(
      "/auth",
      this.authController.makeAuth.bind(this.authController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
