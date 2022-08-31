const express = require("express");
const app = express()
const userRouter = require('./routes/auth')
require("dotenv").config();

require('./config/db')
app.use(express.json());

//Routes
app.use('/user', userRouter)    


app.listen(process.env.DOMAIN_PORT, () => {
    console.log(`Server Started Running on ${process.env.DOMAIN_PORT}...`)
})
