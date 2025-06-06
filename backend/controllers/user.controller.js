const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    // using express validator(user.routes.js) we can get errors in the form of array
  }

  // console.log(req.body);
  const { fullname, email, password } = req.body;

  const isUserExists = await userModel.findOne({ email });
  // check if user with this email already exists
  if (isUserExists) {
    return res
      .status(400)
      .json({ error: "User with this email already exists" });
  }

  // in db save pswd by hashing
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  // by default password is not selected in user model, so we need to select it explicitly.
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatchPswds = await user.comparePasswords(password);
  if (!isMatchPswds) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token);
  // token set in cookies, so that it can be used in subsequent requests
  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
  // user is attached to req object by auth middleware
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  // clear the token from cookies

  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  // get the token from cookies or headers

  await blackListTokenModel.create({ token });
  // save the token in blacklist so that it cannot be used again

  res.status(200).json({ message: "Logged out successfully" });
};
