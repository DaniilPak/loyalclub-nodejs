import { Request, Response } from "express";
import { Business } from "../interfaces/Business";
import { LoyaltyCard } from "../interfaces/LoayltyCard";
import { BusinessService } from "../services/BusinessService";

export class BusinessController {
  private readonly businessService: BusinessService;

  constructor(businessService: BusinessService) {
    this.businessService = businessService;
  }

  async getBusinesses(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.businessService.getAllBusinesses();
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }

  async createBusiness(req: Request, res: Response): Promise<void> {
    try {
      const { name, pictureUrl, loyalPercent, address, workers } = req.body;

      const business: Business = {
        name,
        pictureUrl,
        loyalPercent,
        address,
        workers,
      };

      const data = await this.businessService.createBusiness(business);
      res.status(201).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send(`Error ${err}`);
    }
  }

  async addWorker(req: Request, res: Response): Promise<void> {
    try {
      const { workerId, businessId } = req.body;

      const data = await this.businessService.addWorker(workerId, businessId);
      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error ${error}`);
    }
  }

  async deleteWorker(req: Request, res: Response): Promise<void> {
    try {
      const { workerId, businessId } = req.body;

      const data = await this.businessService.deleteWorker(workerId, businessId);
      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error ${error}`);
    }
  }
}
