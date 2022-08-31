const express = require("express");
const app = express()
const userRouter = require('./routes/auth')
const projectRouter = require('./routes/project')
require("dotenv").config();
const cookieParser = require('cookie-parser')

require('./config/db')

app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/user', userRouter)
app.use('/project',projectRouter)


app.listen(process.env.DOMAIN_PORT, () => {
    console.log(`Server Started Running on ${process.env.DOMAIN_PORT}...`)
})
