const LoyaltyCardModel = require("../models/LoyaltyCardModel");

import { LoyaltyCard } from "../interfaces/LoayltyCard";
import { User } from "../interfaces/User";

export class LoyaltyCardService {
  public async createLoyaltyCard(loyaltyCard: LoyaltyCard) {
    const data = new LoyaltyCardModel({
      userOwner: loyaltyCard.userOwner,
      business: loyaltyCard.business,
      receipts: loyaltyCard.receipts,
      businessName: loyaltyCard.businessName,
      bonusAmount: 0,
    });

    try {
      await data.save();
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getLoyaltyCardById(loyaltyCardId: string) {
    try {
      const data = await LoyaltyCardModel.findOne({ _id: loyaltyCardId });
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

  public async updateBonusAmount(loyaltyCardId: string, amount: number) {
    const loyaltyCardToUpdate = await LoyaltyCardModel.findById(loyaltyCardId);
    const currentVersion = loyaltyCardToUpdate.__v;
    if (amount >= 0) {
      loyaltyCardToUpdate.bonusAmount += amount;
    } else {
      loyaltyCardToUpdate.bonusAmount -= -amount;
    }

    try {
      const updatedDoc = await LoyaltyCardModel.updateOne(
        { _id: loyaltyCardId, __v: currentVersion },
        loyaltyCardToUpdate
      );
      return updatedDoc;
      // Successfully updated document
    } catch (error) {
      // Version conflict occurred
      throw error;
    }
  }
}
