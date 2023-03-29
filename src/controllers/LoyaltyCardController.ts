import { Request, Response } from "express";
import { LoyaltyCardService } from "../services/LoyaltyCardService";
import { LoyaltyCard } from "../interfaces/LoayltyCard";

export class LoyaltyCardController {
  private readonly loyaltyCardService: LoyaltyCardService;

  constructor(loyaltyCardService: LoyaltyCardService) {
    this.loyaltyCardService = loyaltyCardService;
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

      const loyaltyCard: LoyaltyCard = {
        userOwner,
        business,
        receipts
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
