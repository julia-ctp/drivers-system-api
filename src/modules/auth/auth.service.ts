import { AuthRepository } from "./auth.repository.js";
import { AuthInput } from "./auth.schema.js";
import bcrypt from "bcrypt";
import { generateToken, LoginPayload } from "../../utils/jwt.utils.js";
import { AppError } from "../../errors/AppError.js";

export class AuthService {
  private repository = new AuthRepository();

  async login({ email, password }: AuthInput) {
    const user = await this.repository.findUser(email);
    if (!user) throw new AppError("E-mail inválido", 404);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new AppError("Senha incorreta", 401);

    const payload: LoginPayload = {
      id: user.id,
      email: user.email,
      password: user.password,
    };
    const token = generateToken(payload);

    return {
      token,
      user: payload,
    };
  }
}
