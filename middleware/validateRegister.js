import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export const validateRegisteration = (req, res, next) => {
  const { name, email, password } = req.body;
  
  //check if the user already exists
      const existingUser = prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return res.status(409).json({
          // FIXED: Use 409 Conflict instead of 500
          error: "user already exists",
        });
      }

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "error name, email, password required" });
  }
  if (!email.includes("@")) {
    return res.status(400).json({ eror: "invalid email format" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "password too short must be at least 6 characters" });
  }

  
  next();
};
