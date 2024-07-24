//to load .env content into process.env
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Router/routes')
require('./Database/connection')

//creating server
const app = express()

//configuring cors in server
app.use(cors())
app.use(express.json())
app.use(router)

const PORT = 3000

//to run server
app.listen(PORT, () => {
    console.log("Server running")
})

app.get('/', (req, res) => {
    res.status(200).send("<h1>Server Running</h1>")
})