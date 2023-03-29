const Receipt = require("../models/receiptModel");
const UserModel = require("../models/userModel");

import { Receipt } from "../interfaces/Receipt";

export class ReceiptService {
  public async createReceipt(receipt: Receipt) {

    const data = new Receipt({
        restaurantName: receipt.restaurantName,
        orderDate: receipt.orderDate,
        client: receipt.client,
        worker: receipt.worker,
        orderTotal: receipt.orderTotal,
        bonusAmount: receipt.bonusAmount,
    });
    
    const userModel = await UserModel.findById(receipt.worker);
    userModel.orderHistory.push(data);
    userModel.save();

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
