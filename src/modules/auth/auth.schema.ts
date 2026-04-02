import { z } from "zod";

export const AuthSchema = z.object({
  email: z.email().min(1, "E-mail é obrigatório"),
  password: z
    .string()
    .min(6, "Senha é obrigatória e deve ter pelo menos 6 caracteres"),
});

export type AuthInput = z.infer<typeof AuthSchema>;
