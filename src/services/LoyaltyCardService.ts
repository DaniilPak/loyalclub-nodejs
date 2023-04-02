const LoyaltyCardModel = require("../models/LoyaltyCardModel");

import { LoyaltyCard } from "../interfaces/LoayltyCard";
import { User } from "../interfaces/User";

export class LoyaltyCardService {
  public async createLoyaltyCard(loyaltyCard: LoyaltyCard) {
    const data = new LoyaltyCardModel({
      userOwner: loyaltyCard.userOwner,
      business: loyaltyCard.business,
      receipts: loyaltyCard.receipts,
    });

    try {
      await data.save();
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getLoyaltyCardByUserId(userId: User | string) {
    try {
      const data = await LoyaltyCardModel.findOne({ userOwner: userId });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getAllLoyaltyCards() {
    try {
      const data = await LoyaltyCardModel.find();
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async addReceiptToCard(loyaltyCardId: string, receipt: any) {
    const loyaltyCard = await LoyaltyCardModel.findById(loyaltyCardId);

    try {
      loyaltyCard.receipts.push(receipt);
      loyaltyCard.save();
      return loyaltyCard;
    } catch (error) {
      throw error;
    }
  }
}
