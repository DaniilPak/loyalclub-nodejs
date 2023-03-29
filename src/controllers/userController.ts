import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { User } from "../interfaces/user";
import { Receipt } from "../interfaces/receipt";

export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.userService.getAllUsers();
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user: User = req.body;
      const data = await this.userService.createUser(user);
      res.status(201).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }
}
