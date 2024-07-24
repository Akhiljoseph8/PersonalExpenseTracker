const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(() => {
    console.log("Database connected")
}).catch((err) => {
    console.log("Database connection failed")
    console.log(err)
})