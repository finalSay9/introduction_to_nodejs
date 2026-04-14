const express =  require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('hello evan, welcome to the expressjs')
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})