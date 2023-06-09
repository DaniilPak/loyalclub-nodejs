import { User } from "../interfaces/User";
import { Worker } from "../interfaces/Worker";
import { Owner } from "../interfaces/Owner";
import { Receipt } from "../interfaces/Receipt";

const UserModel = require("../models/UserModel");

export class UserService {
  public async createUser(user: User) {
    const userModel = new UserModel({
      type: user.type,
      phoneNumber: user.phoneNumber,
      password: user.password,
      name: user.name,
      surname: user.surname,
      email: user.email,
      homeAddress: user.homeAddress,
      paymentInfo: user.paymentInfo,
      orderHistory: [],
      loyaltyCards: [],
      workBusiness: user.workBusiness,
    });

    try {
      await userModel.save();
      return userModel;
    } catch (error) {
      throw error;
    }
  }

  public async createOwner(owner: Owner) {
    const userModel = new UserModel({
      type: owner.type,
      phoneNumber: owner.phoneNumber,
      password: owner.password,
      name: owner.name,
      surname: owner.surname,
      email: owner.email,
      homeAddress: owner.homeAddress,
      paymentInfo: owner.paymentInfo,
      orderHistory: owner.orderHistory,
      /// Custom options for owner
      business: owner.business,
    });

    try {
      await userModel.save();
      return userModel;
    } catch (error) {
      throw error;
    }
  }

  public async createWorker(worker: Worker) {
    const userModel = new UserModel({
      type: worker.type,
      phoneNumber: worker.phoneNumber,
      password: worker.password,
      name: worker.name,
      surname: worker.surname,
      email: worker.email,
      homeAddress: worker.homeAddress,
      paymentInfo: worker.paymentInfo,
      orderHistory: worker.orderHistory,
      /// Custom options for worker
      workBusiness: worker.workBusiness,
      expirationDate: worker.expirationDate,
      acceptedReceipts: worker.acceptedReceipts,
    });

    try {
      await userModel.save();
      return userModel;
    } catch (error) {
      throw error;
    }
  }

  public async getAllUsers() {
    try {
      const data = await UserModel.find();
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getUserById(userId: string) {
    try {
      const data = await UserModel.findById(userId);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async callUser(userId: string) {
    try {
      const data = await UserModel.deleteOne({ _id: userId });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async updateWorker(workerId: string, type: string, workBusiness: string) {
    try {
      const data = await UserModel.findById(workerId);

      try {
        data.type = type;
        data.workBusiness = workBusiness;
        data.save();
      } catch (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getUserByPhoneNumber(userPhoneNumber: string) {
    try {
      const data = await UserModel.findOne({ phoneNumber: userPhoneNumber });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async addNewLoyaltyCardToUser(cliendId: string, loyaltyCardId: string) {
    const userModel = await UserModel.findById(cliendId);

    try {
      userModel.loyaltyCards.push(loyaltyCardId);
      userModel.save();
    } catch (error) {
      throw error;
    }
  }

  public async addHistory(userId: Worker, data) {
    const userModel = await UserModel.findById(userId);

    try {
      userModel.orderHistory.push(data);
      userModel.save();
    } catch (error) {
      throw error;
    }
  }
}
