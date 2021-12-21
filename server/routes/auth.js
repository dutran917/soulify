const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const verifyToken = require('../middleware/auth')
// check logged in
router.get('/',verifyToken,async(req,res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if(!user) 
            return res.status(400).json({success:false,message: 'user not found'})
        res.json({success: true,user})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'server error'})
    }
})
//register user
router.post('/register', async(req,res)=>{
    const {username,password} = req.body
    if(!username || !password)
        return res
        .status(400)
        .json({success: false, message: 'Missing username or password'})
    try {
        //check for existing user
        const user = await User.findOne({username})
        if(user)
            return res.status(400).json({success: false,message: 'Username exist'})
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({username,password: hashedPassword})
        await newUser.save()
        //return token
        const accessToken = jwt.sign({userId: newUser._id},process.env.ACCESS_TOKEN_SECRET)
        
        res.json({success: true, message: 'user created',accessToken})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'server error'})
    }
})

//login 
router.post('/login', async(req,res) => {
    const {username,password} = req.body
    if(!username || !password)
        return res
        .status(400)
        .json({success: false, message: 'Missing username or password'})
   
    try {
        const user = await User.findOne({username})
        if(!user)
            return res.status(400).json({success:false,message:"Invalid username "})
        
        
        const passwordValid = await argon2.verify(user.password, password)
        if(!passwordValid)
            return res.status(400).json({success:false,message:"Invalid password"})

         //OK    
        const accessToken = jwt.sign({userId: user._id},process.env.ACCESS_TOKEN_SECRET)

        res.json({success: true, message: 'Logged in',accessToken})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'server error'})
    }    
})



module.exports = router