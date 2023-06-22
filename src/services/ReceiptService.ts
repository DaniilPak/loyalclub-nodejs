const Receipt = require("../models/ReceiptModel");

import { LoyaltyCard } from "../interfaces/LoayltyCard";
import { Receipt } from "../interfaces/Receipt";
import { BusinessService } from "./BusinessService";
import { LoyaltyCardService } from "./LoyaltyCardService";
import { UserService } from "./UserService";

export class ReceiptService {
  private readonly loyaltyCardService: LoyaltyCardService;
  private readonly userService: UserService;
  private readonly businessService: BusinessService;

  constructor(
    userService: UserService,
    loyaltyCardService: LoyaltyCardService,
    businessService: BusinessService
  ) {
    this.loyaltyCardService = loyaltyCardService;
    this.userService = userService;
    this.businessService = businessService;
  }

  public async createReceipt(receipt: Receipt) {
    const data = new Receipt({
      purchaseDate: receipt.purchaseDate,
      purchaseAmount: receipt.purchaseAmount,
      card: receipt.client,
      client: receipt.client,
      worker: receipt.worker,
      bonusAmount: receipt.bonusAmount,
      minusBonus: receipt.minusBonus,
      currencySign: receipt.currencySign,
    });

    try {
      this.userService.addHistory(receipt.worker, data);
      this.loyaltyCardService.addReceiptToCard(receipt.card, data);
      this.loyaltyCardService.updateBonusAmount(receipt.card, receipt.bonusAmount, receipt.minusBonus);
      const loyaltyCard = await this.loyaltyCardService.getLoyaltyCardByUserId(receipt.client)
      this.businessService.addReceiptToBusiness(loyaltyCard.business, data);

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

  public async getReceiptById(_receiptId: string) {
    try {
      const data = await Receipt.findById(_receiptId);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
