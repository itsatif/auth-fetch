const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let db = []
const secret = "not to be shared"


loginRouter.post('/login',(req,res)=>{
    const {username,password} = req.body
    const user = db.find(user=>user.username===username && bcrypt.compare(user.password,password));
    if(user){
        let token = jwt.sign({username},secret,{expiresIn:'24h'});
        res.json({
            success : 1,
         message : "You are Successfully Login",
         token     
        })
    }else{
        res.json({
            success: 0,
            message:"Unsuccessfull"
        })
    }
})


loginRouter.get('/getUserFromToken',(req,res)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token,secret);
        res.json({
            success:1,
            message:'Get user from token successful',
            user
        })
    } catch (error) {
        res.json({
            success:0,
            message:"Unsucessful"
        })
    }
})

module.exports = loginRouter;