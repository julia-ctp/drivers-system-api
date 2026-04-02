import jwt, { SignOptions } from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/AppError";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export interface LoginPayload {
  id: string;
  email: string;
  password: string;
}

export function generateToken(
  payload: LoginPayload,
  expiresIn: SignOptions["expiresIn"] = "24h"
) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as LoginPayload;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError")
        throw new AppError("Token expirado", 401);
      if (error.name === "JsonWebTokenError")
        throw new AppError("Token inválido", 401);

      throw error;
    }
  }
}
