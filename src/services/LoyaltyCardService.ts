const Receipt = require("../models/receiptModel");
const UserModel = require("../models/userModel");
const LoyaltyCard = require("../models/LoyaltyCardModel");

import { Receipt } from "../interfaces/Receipt";
import { LoyaltyCard } from "../interfaces/LoayltyCard";

export class LoyaltyCardService {
  public async createLoyaltyCard(loyaltyCard: LoyaltyCard) {
    const data = new LoyaltyCard({
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

  public async getLoyaltyCardByUserId(userId: string) {
    try {
      const data = await LoyaltyCard.findById(userId);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getAllLoyaltyCards() {
    try {
      const data = await LoyaltyCard.find();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
