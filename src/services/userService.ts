import { User } from "../interfaces/User";
import { Worker } from "../interfaces/Worker";
import { Owner } from "../interfaces/Owner";
import { Receipt } from "../interfaces/Receipt";

const UserModel = require("../models/userModel");

export class UserService {
  public async createUser(user: User) {
    const userModel = new UserModel({
      type: user.type,
      phoneNumber: user.phoneNumber,
      bonusAmount: user.bonusAmount,
      name: user.name,
      surname: user.surname,
      email: user.email,
      homeAddress: user.homeAddress,
      paymentInfo: user.paymentInfo,
      orderHistory: user.orderHistory,
    });

    try {
      await userModel.save();
      return userModel;
    } catch (error) {
      throw error;
    }
  }

  public async createBusiness(owner: Owner) {
    const userModel = new UserModel({
      type: owner.type,
      phoneNumber: owner.phoneNumber,
      bonusAmount: owner.bonusAmount,
      name: owner.name,
      surname: owner.surname,
      email: owner.email,
      homeAddress: owner.homeAddress,
      paymentInfo: owner.paymentInfo,
      orderHistory: owner.orderHistory,
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
      bonusAmount: worker.bonusAmount,
      name: worker.name,
      surname: worker.surname,
      email: worker.email,
      homeAddress: worker.homeAddress,
      paymentInfo: worker.paymentInfo,
      orderHistory: worker.orderHistory,
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
}