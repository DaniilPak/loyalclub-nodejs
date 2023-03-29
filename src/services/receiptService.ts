const Receipt = require("../models/receiptModel");
const UserModel = require("../models/userModel");
const LoyaltyCard = require("../models/LoyaltyCardModel");

import { Receipt } from "../interfaces/Receipt";

export class ReceiptService {
  public async createReceipt(receipt: Receipt) {
    const data = new Receipt({
      purchaseDate: receipt.purchaseDate,
      purchaseAmount: receipt.purchaseAmount,
      card: receipt.client,
      client: receipt.worker,
      worker: receipt.worker,
      bonusAmount: receipt.bonusAmount,
    });

    const userModel = await UserModel.findById(receipt.worker);
    userModel.orderHistory.push(data);
    userModel.save();

    const loyaltyCard = await LoyaltyCard.findById(receipt.card);
    loyaltyCard.receipts.push(data);
    loyaltyCard.save();

    try {
      await data.save();
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getAllReceipts() {
    try {
      const data = await Receipt.find();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
