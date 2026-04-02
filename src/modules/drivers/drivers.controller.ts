import { NextFunction, Response, Request } from "express";
import { DriversService } from "./drivers.service";
import {
  CreateDriverSchema,
  GetDriverSchema,
  UpdateDriverSchema,
  SearchDriverSchema,
} from "./drivers.schema";

export class DriversController {
  private service = new DriversService();

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = CreateDriverSchema.parse(req.body);
      const newDriver = await this.service.create(data);

      return res.status(201).json({
        message: "Motorista e veículo cadastrados com sucesso!",
        newDriver,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { q } = SearchDriverSchema.parse(req.query);
      const drivers = await this.service.getAll(q);

      return res.status(200).json(drivers);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = GetDriverSchema.parse(req.params);
      const driver = await this.service.getById(id);

      return res.status(200).json(driver);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = UpdateDriverSchema.parse({
        ...req.body,
        id: req.params.id,
      });

      const updatedDriver = await this.service.patch(data);

      return res.status(200).json({
        message: "Dados atualizados com sucesso!",
        updatedDriver,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = GetDriverSchema.parse(req.params);
      await this.service.delete(id);

      return res.status(200).json({
        message: "Motorista removido com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  }
}
