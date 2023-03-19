const Data = require("../models/model");

export class DataService {
  public async createData(name: string, age: number) {
    // implementation to create a user in database
    const data = new Data({
      name: name,
      age: age,
    });

    try {
      await data.save();
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getAllData() {
    try {
      const data = await Data.find();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
