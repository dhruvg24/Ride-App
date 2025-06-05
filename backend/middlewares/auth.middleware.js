const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authUser=async(req, res, next)=>{
    const token = req.cookies.token||req.headers.authorization.split(' ')[1];
    // token is present either in cookies or in headers
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // verify the token using jwt
        const user = await userModel.findById(decoded._id);

        req.user = user; // attach user to request object            
        return next(); // call next middleware
    } catch (error) {       
        return res.status(401).json({message: 'Unauthorized'});
    }                  



}