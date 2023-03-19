import { Request, Response } from 'express';
import { DataService } from '../services/dataService';
import { DataInterface } from '../models/interfaces/data';

export class DataController {
  private readonly dataService: DataService;

  constructor(dataService: DataService) {
    this.dataService = dataService;
  }

  async getData(req: Request, res: Response): Promise<void> {
    try {
      const datas = await this.dataService.getAllData();
      res.status(200).json(datas);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  }

  async createData(req: Request, res: Response): Promise<void> {
    try {
      const myData: DataInterface = req.body;
      const data = await this.dataService.createData(myData.name, myData.age);
      res.status(201).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  }
}
