import { Request, Response } from "express";
import { ReceiptService } from "../services/ReceiptService";
import { Receipt } from "../interfaces/Receipt";
const UserModel = require("../models/userModel");

export class ReceiptController {
  private readonly receiptService: ReceiptService;

  constructor(receiptService: ReceiptService) {
    this.receiptService = receiptService;
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
      const { purchaseAmount, card, clientId, workerId } =
        req.body;
      const purchaseDate = new Date();

      const receipt: Receipt = {
        purchaseDate,
        purchaseAmount,
        card,
        client: clientId,
        worker: workerId,
        bonusAmount: 0,
      };

      const data = await this.receiptService.createReceipt(
        receipt
      );
      res.status(201).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send(`Error ${err}`);
    }
  }
}
