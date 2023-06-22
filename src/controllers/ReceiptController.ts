import { Request, Response } from "express";
import { ReceiptService } from "../services/ReceiptService";
import { Receipt } from "../interfaces/Receipt";
import { LoyaltyCardService } from "../services/LoyaltyCardService";
import { BusinessService } from "../services/BusinessService";
import { UserService } from "../services/UserService";

export class ReceiptController {
  private readonly receiptService: ReceiptService;
  private readonly loyaltyCardService: LoyaltyCardService;
  private readonly businessService: BusinessService;
  private readonly userService: UserService;

  constructor(
    receiptService: ReceiptService,
    loyaltyCardService: LoyaltyCardService,
    businessService: BusinessService,
    userService: UserService,
  ) {
    this.receiptService = receiptService;
    this.loyaltyCardService = loyaltyCardService;
    this.businessService = businessService;
    this.userService = userService;
  }

  async getDetailedReceipt(req: Request, res: Response): Promise<void> {
    try {
      const { receiptId } = req.body;

      const receiptObject = await this.receiptService.getReceiptById(receiptId);
      // Get client object by receipt cliend id
      const clientObject = await this.userService.getUserById(receiptObject.client);
      // Get worker object 
      const workerObject = await this.userService.getUserById(receiptObject.worker);

      res.status(200).json({ receiptObject, clientObject, workerObject });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
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
      const { purchaseAmount, card, clientId, workerId, bonusAmount, minusBonus } = req.body;

      const purchaseDate = new Date();

      const currentLoyaltyCard =
        await this.loyaltyCardService.getLoyaltyCardByUserId(clientId);
      const currentBusiness = await this.businessService.getBusinessById(
        currentLoyaltyCard.business
      );

      if (minusBonus > currentLoyaltyCard.bonusAmount) {
        res.status(201).json({ error: 'Minus bonus is more than bonus amount exist' });
        return;
      }

      const isOwnerOfBusiness = workerId == currentBusiness.owner;
      const isWorkerOfBusiness = currentBusiness.workers.includes(workerId);

      const countedBonus = (purchaseAmount / 100) * currentBusiness.loyalPercent;

      const receipt: Receipt = {
        purchaseDate,
        purchaseAmount,
        card,
        client: clientId,
        worker: workerId,
        bonusAmount: Math.ceil(countedBonus),
        minusBonus: minusBonus,
        currencySign: currentBusiness.currencySign,
      };

      if (isOwnerOfBusiness || isWorkerOfBusiness) {
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
