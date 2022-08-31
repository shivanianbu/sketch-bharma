const express= require("express")
const router = express.Router();
const bcrypt= require("bcryptjs")
const User = require('../model/user')

router.post('/register',async(req,res) => {

    try{
        const hash = bcrypt.hashSync(req.body.password, 10);
        const user =  new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hash
        })
        const savedUser = await user.save();
        res.send(savedUser)
    }catch(err) {
        res.send(err)
    }
    
})

router.post('/login',async(req,res) => {

    try{
        const userExists = await User.findOne({email: req.body.email})
        if(!userExists){
            res.send("User Not Exists")
        } else {
            const matchedPassword= await bcrypt.compare(req.body.password, userExists.password)
            if(!matchedPassword) {
                res.send("Please enter a valid password")
            }
            res.send("LoggedIn Successfully")
        }
    } catch(e) {
        res.send(e)
    }
})


module.exports= router