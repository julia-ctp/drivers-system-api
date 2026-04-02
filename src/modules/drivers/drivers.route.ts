import { Router, Request, Response, NextFunction } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { DriversController } from "./drivers.controller";

export const driversRouter = Router();
const controller = new DriversController();

driversRouter.use(authMiddleware);

driversRouter.get("/", (req: Request, res: Response, next: NextFunction) =>
  controller.getAll(req, res, next)
);

driversRouter.get("/:id", (req: Request, res: Response, next: NextFunction) =>
  controller.getById(req, res, next)
);

driversRouter.post("/", (req: Request, res: Response, next: NextFunction) =>
  controller.create(req, res, next)
);

driversRouter.patch("/:id", (req: Request, res: Response, next: NextFunction) =>
  controller.update(req, res, next)
);

driversRouter.delete(
  "/:id",
  (req: Request, res: Response, next: NextFunction) =>
    controller.delete(req, res, next)
);
