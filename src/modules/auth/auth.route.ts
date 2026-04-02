import { Router, Request, Response, NextFunction } from "express";
import { AuthController } from "./auth.controller";

export const authRouter = Router();
const controller = new AuthController();

authRouter.post("/login", (req: Request, res: Response, next: NextFunction) =>
  controller.login(req, res, next)
);