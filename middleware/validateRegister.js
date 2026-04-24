export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

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
      .json({ error: "password must be at least 6 characters" });
  }

  //check if the user already exists
  const existingUser = prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return res.status(409).json({
      // FIXED: Use 409 Conflict instead of 500
      error: "user already exists",
    });
  }

  next();
};
