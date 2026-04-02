import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { Prisma } from "../generated/prisma/client";
import { AppError } from "../errors/AppError.js";

export function errorHandler(
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) return next(error);

  if (error instanceof ZodError) {
    return res.status(400).json({
      error: "Erro de validação",
      details: z.treeifyError(error),
    });
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  ) {
    return res.status(404).json({
      error: "Registro não encontrado",
    });
  }

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      error: "JSON inválido",
    });
  }

  if (error instanceof AppError) {
    return res.status(error.status).json({ error: error.message });
  }

  return res.status(500).json({ error: "Erro interno no servidor" });
}
