import { Request, Response } from "express";
import { ReceiptService } from "../services/ReceiptService";
import { Receipt } from "../interfaces/Receipt";
import { LoyaltyCardService } from "../services/LoyaltyCardService";
import { BusinessService } from "../services/BusinessService";

export class ReceiptController {
  private readonly receiptService: ReceiptService;
  private readonly loyaltyCardService: LoyaltyCardService;
  private readonly businessService: BusinessService;

  constructor(receiptService: ReceiptService, loyaltyCardService: LoyaltyCardService, businessService: BusinessService) {
    this.receiptService = receiptService;
    this.loyaltyCardService = loyaltyCardService;
    this.businessService = businessService;
    
  }

  async getReceipts(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.receiptService.getAllReceipts();
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }

  async createReceipt(req: Request, res: Response): Promise<void> {
    try {
      const { purchaseAmount, card, clientId, workerId } = req.body;
      const purchaseDate = new Date();

      const receipt: Receipt = {
        purchaseDate,
        purchaseAmount,
        card,
        client: clientId,
        worker: workerId,
        bonusAmount: 0,
      };

      const currentLoyaltyCard = await this.loyaltyCardService.getLoyaltyCardByUserId(clientId);
      const currentBusiness = await this.businessService.getBusinessById(currentLoyaltyCard.business);
      const isOwnerOfBusiness = workerId == currentBusiness.owner;

      if (isOwnerOfBusiness) {
        const data = await this.receiptService.createReceipt(receipt);
        res.status(201).json(data);
      } else {
        res.status(500).send(`Error`);
      }
    } catch (err) {
      res.status(500).send(`Error ${err}`);
    }
  }
}
