import { Request, Response } from "express";
import { DataService } from "../services/dataService";
import { DataInterface } from "../interfaces/data";
const jwt = require("jsonwebtoken");

export class DataController {
  private readonly dataService: DataService;

  constructor(dataService: DataService) {
    this.dataService = dataService;
  }

  async getData(req: Request, res: Response): Promise<void> {
    try {
      const datas = await this.dataService.getAllData();
      res.status(200).json(datas);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }

  async createData(req: Request, res: Response): Promise<void> {
    try {
      const myData: DataInterface = req.body;
      const data = await this.dataService.createData(myData.name, myData.age);
      res.status(201).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }

  async getDataById(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const data = await this.dataService.getDataById(id);
      res.status(201).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }

  // Set up route to authenticate user and send JWT token
  async makeAuth(req: Request, res: Response) {
    const { username, password } = req.body;
    if (username === "admin" && password === "password") {
      const token = jwt.sign({ username }, "secret", { expiresIn: "1h" });
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }

  async getProtectedInfo(req: Request, res: Response) {
    res.json({ message: `Welcome ${req}! This is protected data.` });
  }
}
