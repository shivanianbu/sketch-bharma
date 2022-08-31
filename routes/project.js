const express = require('express')
const { loginRequired } = require('../helper/token')
const router = express.Router()

router.get('/',loginRequired,(req,res)=> {
    res.send("Welcome to pro")
})

module.exports=router;