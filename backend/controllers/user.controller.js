const userModel=require('../models/user.model')
const userService = require('../services/user.service')
const {validationResult} = require('express-validator');

module.exports.registerUser=async(req, res, next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
        // using express validator(user.routes.js) we can get errors in the form of array
    }

    // console.log(req.body);
    const {fullname, email, password} = req.body;
    // in db save pswd by hashing
    const hashedPassword=await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname, lastname:fullname.lastname, email, password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token, user});

}