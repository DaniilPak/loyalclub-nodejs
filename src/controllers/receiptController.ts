import { Request, Response } from "express";
import { ReceiptService } from "../services/receiptService";
import { Receipt } from "../interfaces/receipt";
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
      const { restaurantName, orderTotal, bonusAmount, workerId, clientId } =
        req.body;
      const orderDate = new Date();

      const receipt: Receipt = {
        restaurantName,
        orderDate,
        orderTotal,
        bonusAmount,
        worker: workerId,
        client: clientId,
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
