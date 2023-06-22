const BusinessModel = require("../models/BusinessModel");

import { Business } from "../interfaces/Business";

export class BusinessService {
  public async createBusiness(business: Business) {
    const data = new BusinessModel({
      name: business.name,
      pictureUrl: business.pictureUrl,
      loyalPercent: business.loyalPercent,
      address: business.address,
      workers: business.workers,
      owner: business.owner,
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
      const data = await BusinessModel.find();
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async addWorker(workerId: string, businessId: string) {
    try {
      const business = await BusinessModel.findById(businessId);

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
      const business = await BusinessModel.findById(businessId);
      const workerIndex = business.workers.indexOf(workerId);

      if (workerIndex !== -1) {
        business.workers.splice(workerIndex, 1);
        business.save();
      }

      return business;
    } catch (error) {
      throw error;
    }
  }

  public async updateBusinessInfo(business: Business, businessId) {
    const filter = { _id: businessId };
    const update = business;
    const options = { new: true };

    try {
      const data = await BusinessModel.findOneAndUpdate(
        filter,
        update,
        options
      );
      data.save();
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getBusinessById(businessId: string) {
    try {
      const data = await BusinessModel.findById(businessId);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async addReceiptToBusiness(businessId: Business | string, receipt) {
    try {
      const business = await BusinessModel.findById(businessId);

      business.receipts.push(receipt);
      business.save();

      return business;
    } catch (error) {
      throw error;
    }
  }
}
