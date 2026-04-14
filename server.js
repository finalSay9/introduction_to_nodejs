const express =  require('express')
const { PrismaClient } = require("@prisma/client");
const app = express()
const prisma = new PrismaClient();
const PORT = 3000

app.use(express.json());

//create user
app.post('/users', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});