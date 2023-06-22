import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { User } from "../interfaces/User";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();
const mongoJwtSecret = process.env.JWT_SECRET;

export class AuthController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  // Set up route to authenticate user and send JWT token
  async makeAuth(req: Request, res: Response) {
    const { phoneNumber, password } = req.body;

    try {
      const userData = await this.userService.getUserByPhoneNumber(phoneNumber);
      const isPasswordCorrect = await bcrypt.compare(password, userData.password);

      if (isPasswordCorrect) {
        const token = jwt.sign({ _id: userData._id }, mongoJwtSecret, { expiresIn: "24h" });
        res.json({ token, userData });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (err) {
      res.json({ err });
    }
  }

  // async registerNew(req: Request, res: Response) {
  //   const { phoneNumber, name, surname, password } = req.body;

  //   try {
  //     const userData = await this.userService.getUserByPhoneNumber(phoneNumber);

  //     if (userData) {
  //       res.status(401).json({ message: "User exists" });
  //     }

  //     const newUser: User = {
  //       type: 'Client',
  //       phoneNumber,
  //       name,
  //       surname,
  //       password,
  //     }

  //     const newUserObject = await this.userService.createUser(newUser);
  //     res.json({ newUserObject });

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}
