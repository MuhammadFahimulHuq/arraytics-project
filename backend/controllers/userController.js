const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcryptjs");
const User = require("../models/userModal");
const { use } = require("../routes/itemRoutes");
//@desc register user
//@route POST api/user
//@access PUBLIC
const registerUser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the filed.");
  }
  //check user exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }
  //hash password
  const salt = await bcrpyt.genSalt(10);
  const hashedPassword = await bcrpyt.hash(password, salt);
  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc  login user
//@route POST api/item
//@access PUBLIC
const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrpyt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credential");
  }
});

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//@desc get user
//@route GET api/user
//@access PRIVATE
const getme = asynchandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.status(200).json({
      name: user.name,
    });
  } else {
    res.status(400);
    throw new Error("user not found");
  }
});

module.exports = {
  registerUser,
  loginUser,
  getme,
};
