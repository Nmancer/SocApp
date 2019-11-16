const { userService } = require("../services");
const { ErrorHandler } = require("../utils/error");
const { signWithJwt } = require("../utils/signJwt");
const asyncWrapper = require("../utils/asyncWrapper");

const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userService.getUserByEmail(email);

  if (!user || user.comparePassword(password)) {
    throw new ErrorHandler(401, "Incorrect credentials");
  }
  const { name, username, id } = user;
  const token = signWithJwt(
    { name, username, id, email },
    process.env.JWTSECRET
  );

  res
    .status(200)
    .json({ message: "successfully authenticated", success: true, token });
});

const registerUser = asyncWrapper(async (req, res, next) => {});

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
