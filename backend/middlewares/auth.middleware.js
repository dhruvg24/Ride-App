const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const driverModel = require('../models/driver.model');

module.exports.authUser=async(req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // token is present either in cookies or in headers
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

    const isTokenBlacklisted = await blacklistTokenModel.findOne({token: token});

    if(isTokenBlacklisted){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // verify the token using jwt
        

        const user = await userModel.findById(decoded._id);
        console.log('Found user: ', user);
        if(!user){
            return res.status(401).json({message: 'User not found'})
        }

        req.user = user; // attach user to request object            
        return next(); // call next middleware
    } catch (error) {       
        return res.status(401).json({message: 'Unauthorized'});
    }                  
}


module.exports.authDriver=async(req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // token is present either in cookies or in headers
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

    const isTokenBlacklisted = await blacklistTokenModel.findOne({token: token});

    if(isTokenBlacklisted){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // verify the token using jwt
        const driver = await driverModel.findById(decoded._id)

        req.driver=driver;

        return next();
        // very essential 
    }
    catch(err){
        // console.log(err)
        res.status(401).json({message: 'Unauthorized'});
    }
}