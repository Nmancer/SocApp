const { profileService } = require("../services");
const asyncWrapper = require("../utils/asyncWrapper");
const sendSuccess = require("../utils/sendSuccess");

const editUser = asyncWrapper(async (req, res, next) => {
  const userDTO = req.body;
  const { user } = await profileService.editUser(req.user.id, userDTO);
  sendSuccess(res, { user });
});

const editUserPassword = asyncWrapper(async (req, res, next) => {
  const userDTO = req.body;
  await profileService.editUserPassword(req.user.id, userDTO);
  sendSuccess(res, { message: "Successfully changed password", success: true });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const { user } = await profileService.deleteUser(req.user.id);
  sendSuccess(res, { user });
});

const getLoggedUser = asyncWrapper(async (req, res, next) => {
  sendSuccess(res, { user: req.user });
});
module.exports = {
  getLoggedUser,
  editUser,
  editUserPassword,
  deleteUser
};
