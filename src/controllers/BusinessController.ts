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
}
