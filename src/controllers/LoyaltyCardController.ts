import { Request, Response } from "express";
import { LoyaltyCardService } from "../services/LoyaltyCardService";
import { LoyaltyCard } from "../interfaces/LoayltyCard";
import { BusinessService } from "../services/BusinessService";

export class LoyaltyCardController {
  private readonly loyaltyCardService: LoyaltyCardService;
  private readonly businessService: BusinessService;

  constructor(loyaltyCardService: LoyaltyCardService, businessService: BusinessService) {
    this.loyaltyCardService = loyaltyCardService;
    this.businessService = businessService;
  }

  async getLoyaltyCardById(req: Request, res: Response): Promise<void> {
    try {
      const { loyaltyCardId } = req.body;

      const data = await this.loyaltyCardService.getLoyaltyCardById(loyaltyCardId);
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }

  async getOrCreateLoyaltyCard(req: Request, res: Response): Promise<void> {
    try {
      const { cliendId, businessId } = req.body;

      let newLoyaltyCard = null;

      const existingLoyaltyCard = await this.loyaltyCardService.getLoyaltyCardByClientIdAndBusinessId(cliendId, businessId);
      const businessObject = await this.businessService.getBusinessById(businessId);

      const loyaltyCard: LoyaltyCard = {
        userOwner: cliendId,
        business: businessId,
        receipts: [],
        businessName: businessObject.name,
        currencySign: businessObject.currencySign,
      }

      if (!existingLoyaltyCard) {

        if (!businessObject) {
          res.status(500).send("Business object does not exist");
          return;
        }

        newLoyaltyCard = await this.loyaltyCardService.createLoyaltyCard(loyaltyCard);
        res.status(200).json(newLoyaltyCard);
      } else {
        res.status(200).json(existingLoyaltyCard);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }

  async getLoyaltyCards(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.loyaltyCardService.getAllLoyaltyCards();
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }

  async createLoyaltyCard(req: Request, res: Response): Promise<void> {
    try {
      const { userOwner, business, receipts } =
        req.body;

      const businessObject = await this.businessService.getBusinessById(business);
      const businessName = businessObject.name;

      const loyaltyCard: LoyaltyCard = {
        userOwner,
        business,
        receipts,
        businessName,
        currencySign: businessObject.currencySign,
      };

      const data = await this.loyaltyCardService.createLoyaltyCard(
        loyaltyCard
      );
      res.status(201).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send(`Error ${err}`);
    }
  }
}
