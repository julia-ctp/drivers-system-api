import { z } from "zod";

export const CreateDriverSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  document: z
    .string()
    .min(11, "Documento deve ter pelo menos 11 dígitos")
    .max(14, "Documento deve ter no máximo 14 dígitos"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  vehicle: z.object({
    plate: z
      .string()
      .min(7, "Placa deve ter pelo menos 7 caracteres")
      .max(8, "Placa deve ter no máximo 8 caracteres")
      .transform((value) => value.toUpperCase()),
    brand: z.string().min(1, "Marca é obrigatória"),
    model: z.string().min(1, "Modelo é obrigatório"),
    color: z.string().min(3, "Cor é obrigatória"),
  }),
});

export const UpdateDriverSchema = z.object({
  id: z.uuid("ID inválido"),
  ...CreateDriverSchema.partial().shape,
});

export const GetDriverSchema = z.object({
  id: z.uuid("ID inválido"),
});

export const SearchDriverSchema = z.object({
  q: z.string().optional(),
});

export type CreateDriverInput = z.infer<typeof CreateDriverSchema>;
export type UpdateDriverInput = z.infer<typeof UpdateDriverSchema>;
