const { userService } = require("../services");

const asyncWrapper = require("../utils/asyncWrapper");
const sendSuccess = require("../utils/sendSuccess");
const loginUser = asyncWrapper(async (req, res, next) => {
  const userDTO = req.body;
  const { token } = await userService.login(userDTO);

  sendSuccess(res, {
    message: "Successfully authenticated",
    success: true,
    token
  });
});

const registerUser = asyncWrapper(async (req, res, next) => {
  const userDTO = req.body;

  const { registeredUser } = await userService.register(userDTO);

  sendSuccess(res, {
    message: "Successfully registered",
    success: true,
    user: registeredUser
  });
});

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 15;
  const { users } = await userService.listUsers(page, limit);
  sendSuccess(res, { users });
});
const getSingleUser = asyncWrapper(async (req, res, next) => {
  const { user } = await userService.findUserById(req.params.id);

  sendSuccess(res, { user });
});

const editUser = asyncWrapper(async (req, res, next) => {
  const userDTO = req.body;

  const { user } = await userService.editUser(req.user.id, userDTO);

  sendSuccess(res, { user });
});
const editUserPassword = asyncWrapper(async (req, res, next) => {
  const userDTO = req.body;

  await userService.editUserPassword(req.user.id, userDTO);

  sendSuccess(res, { message: "Successfully changed password", success: true });
});
const followUser = asyncWrapper(async (req, res, next) => {
  const { loggedUser, targetUser } = await userService.followUser(
    req.user.id.toString(),
    req.params.id.toString()
  );

  sendSuccess(res, { targetUser, loggedUser });
});
const deleteUser = asyncWrapper(async (req, res, next) => {
  const { user } = await userService.deleteUser(req.user.id);

  sendSuccess(res, { user });
});

const getLoggedUser = asyncWrapper(async (req, res, next) => {
  sendSuccess(res, { user: req.user });
});
module.exports = {
  loginUser,
  registerUser,
  getAllUsers,
  getSingleUser,
  getLoggedUser,
  editUser,
  editUserPassword,
  deleteUser,
  followUser
};
