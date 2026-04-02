import { prisma } from "../../db/prisma.js";
import { AppError } from "../../errors/AppError.js";
import {
    CreateDriverInput,
    UpdateDriverInput,
} from "../../modules/drivers/drivers.schema.js";
import { Prisma } from "../../generated/prisma/client.js";

export class DriversService {
  async create(data: CreateDriverInput) {
    const existingDriver = await prisma.driver.findUnique({
      where: { document: data.document },
    });

    if (existingDriver) {
      throw new AppError("Já existe um motorista com este documento.", 409);
    }

    const existingVehicle = await prisma.vehicle.findUnique({
      where: { plate: data.vehicle.plate },
    });

    if (existingVehicle) {
      throw new AppError("Esta placa já está vinculada a outro veículo.", 409);
    }

    return await prisma.driver.create({
      data: {
        name: data.name,
        document: data.document,
        phone: data.phone,
        vehicles: {
          create: data.vehicle,
        },
      },
      include: { vehicles: true },
    });
  }

  async getAll(search?: string) {
    const where: Prisma.DriverWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { document: { contains: search } },
            {
              vehicles: {
                some: {
                  plate: { contains: search.toUpperCase() },
                },
              },
            },
          ],
        }
      : {};

    return await prisma.driver.findMany({
      where,
      include: { vehicles: true },
      orderBy: { name: "asc" },
    });
  }

  async getById(id: string) {
    const driver = await prisma.driver.findUnique({
      where: { id },
      include: { vehicles: true },
    });

    if (!driver) throw new AppError("Motorista não encontrado", 404);

    return driver;
  }

  async patch(data: UpdateDriverInput) {
    const { id, vehicle, ...driverData } = data;

    await this.getById(id);

    if (vehicle?.plate) {
      const plateInUse = await prisma.vehicle.findFirst({
        where: {
          plate: vehicle.plate,
          NOT: { driver_id: id },
        },
      });

      if (plateInUse) {
        throw new AppError("A placa informada já está em uso.", 409);
      }
    }

    return await prisma.driver.update({
      where: { id },
      data: {
        ...driverData,
        vehicles: vehicle
          ? {
              updateMany: {
                where: { driver_id: id },
                data: vehicle,
              },
            }
          : undefined,
      },
      include: { vehicles: true },
    });
  }

  async delete(id: string) {
    return await prisma.driver.delete({
      where: { id },
    });
  }
}
