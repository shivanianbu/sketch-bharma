const express= require("express")
const router = express.Router();
const bcrypt= require("bcryptjs")
const User = require('../model/user')
const {tokenGenerator, loginRequired} = require('../helper/token')

router.post('/register',async(req,res) => {

    try{
        const { userName, email , password } = req.body
        const userExists = await User.findOne({email: req.body.email})
        if(!userName || !email || !password) {
           return res.send("Please enter all the details")
        }
        if(userExists) {
            return res.status(400).send('User Already Exists!');
        }
        const hash = bcrypt.hashSync(password, 10);
        const user =  new User({
            userName: userName,
            email: email,
            password: hash
        })
        const savedUser = await user.save();
        const token = await tokenGenerator(userExists.email)
        res.cookie("jwt",token)
        res.send(savedUser)
    }catch(err) {
        res.send(err)
    }
    
})

router.post('/login',async(req,res) => {

    try{
        const { email, password } = req.body;
        const userExists = await User.findOne({email})
        if(!userExists){
            return res.status(400).send('User Not Exists!');
        }else if (!email || !password) {
            return res.status(400).send("Please Enter the details ")
        } else {
            const matchedPassword= await bcrypt.compare(password, userExists.password)
            if(!matchedPassword) {
                return res.status(400).send("Please enter a valid password")
            } else {
                const token = await tokenGenerator(userExists.email)
                res.cookie("jwt",token)
                res.send("LoggedIn Successfully")
            }
        }
    } catch(error) {
        res.send(error)
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    return res.send("LoggedOut Successfully");
  });

module.exports= router;