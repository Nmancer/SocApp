const { User } = require("../models/");
const { userService } = require("../services");
const { ErrorHandler } = require("../utils/error");
const { signWithJwt } = require("../utils/signJwt");
const asyncWrapper = require("../utils/asyncWrapper");

const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userService.getUserByEmail(email);

  if (!user || !(await user.comparePassword(password))) {
    throw new ErrorHandler(401, "Incorrect credentials");
  }

  const { name, username, id } = user;
  const token = await signWithJwt(
    { name, username, id, email },
    process.env.JWTSECRET
  );

  res
    .status(200)
    .json({ message: "successfully authenticated", success: true, token });
});

const registerUser = asyncWrapper(async (req, res, next) => {
  const { email, password, name, username, avatar, about } = req.body;
  const user = await userService.getUserByEmail(email);

  if (user) {
    throw new ErrorHandler(400, "User with that email already exists");
  }
  const userToRegister = new User({
    email,
    password,
    name,
    username,
    avatar,
    about
  });
  const registeredUser = await userService.saveUser(userToRegister);

  res.status(200).json({
    message: "successfully registered",
    success: true,
    user: registeredUser
  });
});

const getAllUsers = asyncWrapper(async (req, res, next) => {});

const getSingleUser = asyncWrapper(async (req, res, next) => {});
const editUser = asyncWrapper(async (req, res, next) => {});
const followUser = asyncWrapper(async (req, res, next) => {});

module.exports = {
  loginUser,
  registerUser,
  getAllUsers,
  getSingleUser,
  editUser,
  followUser
};
