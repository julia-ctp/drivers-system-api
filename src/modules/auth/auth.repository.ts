import { prisma } from "../../db/prisma";

export class AuthRepository {
  findUser(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}
