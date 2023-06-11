import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        const token = jwt.sign({ _id: userData._id }, "secret", { expiresIn: "1h" });
        res.json({ token, userData });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (err) {
      console.log(err);
    }

  }
}
