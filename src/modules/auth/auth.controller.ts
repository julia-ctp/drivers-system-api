import { AuthSchema } from "./auth.schema";
import { AuthService } from "./auth.service.js";
import { NextFunction, Request, Response } from "express";

export class AuthController {
  private service = new AuthService();

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = AuthSchema.parse(req.body);
      const response = await this.service.login(data);
      return res
        .status(200)
        .json({ message: "Login feito com sucesso!", response });
    } catch (error) {
      next(error);
    }
  }
}
