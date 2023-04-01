import { Request, Response } from "express";
import { Business } from "../interfaces/Business";
import { LoyaltyCard } from "../interfaces/LoayltyCard";
import { BusinessService } from "../services/BusinessService";
import { UserService } from "../services/UserService";
import { Owner } from "../interfaces/Owner";

const jwt = require("jsonwebtoken");

export class BusinessController {
  private readonly businessService: BusinessService;
  private readonly userService: UserService;

  constructor(businessService: BusinessService, userService: UserService) {
    this.businessService = businessService;
    this.userService = userService;
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
      const { name, pictureUrl, loyalPercent, address, workers, owner } =
        req.body;

      const business: Business = {
        name,
        pictureUrl,
        loyalPercent,
        address,
        workers,
        owner,
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

      const data = await this.businessService.deleteWorker(
        workerId,
        businessId
      );
      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error ${error}`);
    }
  }

  async updateBusinessInfo(req: Request, res: Response): Promise<void> {
    try {
      const business: Business = req.body;
      const businessId = req.headers.businessid;
      const token = req.headers.authorization;

      // Decode the token
      const decoded = jwt.verify(token, "secret");

      const owner = await this.userService.getUserById(decoded._id);
      const currentBusiness = await this.businessService.getBusinessById(
        businessId.toString()
      );

      if (currentBusiness.owner != decoded._id) {
        res
          .status(500)
          .send(
            `Owner ${owner.name} ${owner.surname} is not owned this business ${businessId}`
          );
        return;
      }

      const data = await this.businessService.updateBusinessInfo(
        business,
        businessId
      );
      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error ${error}`);
    }
  }
}
