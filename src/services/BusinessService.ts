const LoyaltyCard = require("../models/LoyaltyCardModel");
const Business = require("../models/businessModel");

import { LoyaltyCard } from "../interfaces/LoayltyCard";
import { Business } from "../interfaces/Business";

export class BusinessService {
  public async createBusiness(business: Business) {
    const data = new Business({
      name: business.name,
      pictureUrl: business.pictureUrl,
      loyalPercent: business.loyalPercent,
      address: business.address,
      workers: business.workers,
    });

    try {
      await data.save();
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getAllBusinesses() {
    try {
      const data = await Business.find();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
