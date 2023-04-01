import { Request, Response } from "express";
const jwt = require("jsonwebtoken");

export class AuthController {
  // Set up route to authenticate user and send JWT token
  async makeAuth(req: Request, res: Response) {
    const { username, password } = req.body;
    if (username === "admin" && password === "password") {
      const token = jwt.sign({ username }, "secret", { expiresIn: "1h" });
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }
}
