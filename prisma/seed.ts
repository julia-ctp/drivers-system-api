import { prisma } from "../src/db/prisma";
import bcrypt from "bcrypt";

async function seed() {
  const password = "seed123";
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email: "user@teste.com",
      password: hashedPassword,
    },
  });
}

seed().then(() => prisma.$disconnect());
