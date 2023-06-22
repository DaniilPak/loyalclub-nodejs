const LoyaltyCardModel = require("../models/LoyaltyCardModel");
const mongoose = require('mongoose');

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
      currencySign: loyaltyCard.currencySign,
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
      const data = await LoyaltyCardModel.findById(loyaltyCardId);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getLoyaltyCardByClientIdAndBusinessId(cliendId: string, businessId: string) {
    try {
      const data = await LoyaltyCardModel.findOne({
        userOwner: cliendId,
        business: businessId
      });
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

  public async updateBonusAmount(loyaltyCardId: string, amount: number, minusBonus: number) {
    try {
      LoyaltyCardModel.findById(loyaltyCardId)
        .then((document) => {
          if (!document) {
            throw new Error('Document not found');
          }

          // Update the document
          document.bonusAmount += amount;
          document.bonusAmount -= minusBonus;

          // Save the updated document
          return document.save();
        })
        .then((updatedDocument) => {
          console.log('Updated document:', updatedDocument);
        })
        .catch((error) => {
          if (error instanceof mongoose.Error.VersionError) {
            // Handle concurrency conflict
            console.error('Concurrency conflict occurred:', error);
          } else {
            // Handle other errors
            console.error('Error updating document:', error);
          }
        });
    } catch (error) {
      throw error;
    }
  }
}
