const Business = require("../models/businessModel");

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

  public async addWorker(workerId: string, businessId: string) {
    try {
      const business = await Business.findById(businessId);

      if (!business.workers.includes(workerId)) {
        business.workers.push(workerId);
        business.save();
      }

      return business;
    } catch (error) {
      throw error;
    }
  }

  public async deleteWorker(workerId: string, businessId: string) {
    try {
      const business = await Business.findById(businessId);
      business.workers.pull(workerId);
      business.save();

      return business;
    } catch (error) {
      throw error;
    }
  }
}
