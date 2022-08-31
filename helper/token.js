const jwt = require("jsonwebtoken");

const tokenGenerator = (email) => {
    const secret = process.env.JWT_KEY
    const token = jwt.sign(
        {email},
        secret,
        {expiresIn: "3hours"}
    )
    return token;
}

const verifyToken = (token) => {
    try{
        const verifiedToken = jwt.verify(token,process.env.JWT_KEY)
        return verifiedToken;
    } catch (err) {
        return false;
    }
}

const loginRequired = async(req,res,next) => {
    try {
        const { jwt } = req.cookies;
        const validToken = await verifyToken(jwt)
        if(validToken) {
            next();
        }else{
            return res.send("Please Login to Continue...")
        }
    }catch(err){
        res.send(err)
    }
}

module.exports = { 
    tokenGenerator,
    verifyToken,
    loginRequired
 }