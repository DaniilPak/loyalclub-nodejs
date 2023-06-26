export { };

import { Router } from "express";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";
import { checkToken } from "../middlewares/checkToken";

export class UserRoute {
  private readonly router: Router;
  private readonly userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController(new UserService());
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get(
      "/",
      this.userController.getUsers.bind(this.userController)
    );
    this.router.post(
      "/",
      this.userController.createUser.bind(this.userController)
    );
    this.router.post(
      "/getuserbyid",
      this.userController.getUserById.bind(this.userController)
    );
    this.router.post(
      "/owner",
      this.userController.createOwner.bind(this.userController)
    );
    this.router.post(
      "/worker",
      this.userController.createWorker.bind(this.userController)
    );
    this.router.post(
      "/getuserbyphone",
      this.userController.getUserByPhoneNumber.bind(this.userController)
    );
    this.router.post(
      "/calluser",
      checkToken,
      this.userController.callUser.bind(this.userController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
