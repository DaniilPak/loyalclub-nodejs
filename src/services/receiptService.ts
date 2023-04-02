const Receipt = require("../models/receiptModel");

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
    });

    try {
      this.userService.addHistory(receipt.worker, data);
      this.loyaltyCardService.addReceiptToCard(receipt.card, data);
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
}
