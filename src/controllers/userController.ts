import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { User } from "../interfaces/User";
import { Receipt } from "../interfaces/Receipt";
import { Owner } from "../interfaces/Owner";
import { Worker } from "../interfaces/Worker";

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

  async createOwner(req: Request, res: Response): Promise<void> {
    try {
      const owner: Owner = req.body;
      const data = await this.userService.createOwner(owner);
      res.status(201).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    } 
  }

  async createWorker(req: Request, res: Response): Promise<void> {
    try {
      const worker: Worker = req.body;
      const data = await this.userService.createWorker(worker);
      res.status(201).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    } 
  }

}
