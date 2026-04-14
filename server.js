const express =  require('express')
const { PrismaClient } = require("@prisma/client");
const app = express()
const prisma = new PrismaClient();
const PORT = 3000

app.use(express.json());

//create user

app.post('/users', async (req, res) => {
    const user = await prisma.user.create({
        data: req.body,
    });
    res.json(user);
})


app.get('/users', async (req, res) => {
    const users = await prisma.user.findMnay();
    res.json(users);
})





app.get('/', (req, res) => {
    res.send('hello evan, welcome to the expressjs')
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})